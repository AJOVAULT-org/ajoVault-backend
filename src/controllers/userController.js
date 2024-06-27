const users = require("../models/user");
const bcrypt = require("bcrypt");
const { verificationEmail } = require("../config/email/sendMail");
const generateOTP = require("../utils/otpGenerator");
const apiHttpStatusCodes = require("../utils/apiStatusCode");
const { accessToken, refreshToken } = require("../utils/jwt");

class User {
  static async Register(req, res) {
    const { fullName, email, password, phoneNumber, promoCode } = req.body;
    try { 
      const existingUser = await users.findOne({ email });
      if (existingUser && existingUser.password) {
        return res.status(apiHttpStatusCodes.STATUS_CONFLICT).json({
          message: "User already exists, please login"
        });
      } 
      
      if (existingUser) return res.status(apiHttpStatusCodes.STATUS_BAD_REQUEST).json({ error: true, message: "User was federated" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = await generateOTP(email);

      const newUser = new users({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        promoCode,
        otp, // --| Adding otp to user db, should be updated anytime otp is generated
      });
      
      // --| Before saving a new user, send a mail with verification OTP to the user email
      await verificationEmail(otp, fullName, email);
      await newUser.save(); 
      return res.status(apiHttpStatusCodes.STATUS_CREATED).json({
        error: false,
        message: "User saved Successfully"
      });
    }
    catch (err) {
      return res.status(apiHttpStatusCodes.STATUS_INTERNAL_SERVER_ERROR).json({
        error: true,
        serverMessage: err.message,
        message: "Internal Server Error"
      });
    }
  }

  static async Login(req, res) {
    try {
      const { email, password: candidatePassword } = req.body;
      const user = await users.findOne({ email }).lean();
      if (!user) {
        return res.status(apiHttpStatusCodes.STATUS_NOT_FOUND).json({
          message: "User does not exist",
          error: true
        });
      }

      if (!user.email_verified) return res.status(apiHttpStatusCodes.STATUS_UNAUTHORIZED).json({  error: true, message: "User not verified" });

      const passwordMatch = await bcrypt.compare(candidatePassword, user.password);
      if (!passwordMatch) {
        return res.status(apiHttpStatusCodes.STATUS_NOT_FOUND).json({
          message: "Invalid Credentials",
          error: true
        });
      }

      // --| Generate jwt and encode user details, send jwt to client
      // --| Might be sending them using cookies later or might just use sessions instead
      const access_token = accessToken({id: user._id, email});
      const refresh_token = refreshToken({id: user._id, email});
      return res.status(apiHttpStatusCodes.STATUS_OK).json({
        access_token,
        refresh_token,
        message: "Login Successful",
        error: false
      });
    }
    catch (err) {
      return res.status(apiHttpStatusCodes.STATUS_INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: true,
        serverMessage: err.message
      });
    }
  }
  static async updateUser(req, res) {

    try {
      const { fullName, phoneNumber, transaction_pin } = req.body;
      const { userId } = req.params;
      // Update user details
      const pin = await bcrypt.hash(transaction_pin, 10);
      const result = await users.findByIdAndUpdate({ _id: userId }, { fullName, phoneNumber, transaction_pin: pin });

      if (result) {
        return res.status(apiHttpStatusCodes.STATUS_OK).json({
          error: false,
          message: "Updated Successfully"
        });
      } else {
        return res.status(apiHttpStatusCodes.STATUS_NOT_FOUND).json({
          message: "Failed to Update",
          error: true
        });
      }
    } catch (err) {
      return res.status(apiHttpStatusCodes.STATUS_INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: true,
        serverError: err.message,
      });
    }
  }
  static async deleteUser(req, res) {

    try {
      // Delete user account
      const { userId } = req.params;
      const result = await users.findByIdAndDelete({ _id: userId });

      if (result) {
        return res.status(apiHttpStatusCodes.STATUS_OK).json({
          message: "Deleted Successfully"
        });
      } else {
        return res.status(apiHttpStatusCodes.STATUS_NOT_FOUND).json({
          message: "Unable to delete",
          error: true
        });
      }
    } catch (error) {
      return res.status(apiHttpStatusCodes.STATUS_INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: true,
        serverError: error.message,
      });
    }
  }
}

module.exports = User;