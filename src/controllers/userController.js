const { default: mongoose } = require('mongoose');
const users = require('../models/user');
const bcrypt = require('bcrypt');
class User {
    static async Register(req, res) {
        try {
            const existingUser = await users.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(409).json({
                    message: "User already exists"
                });
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new users({
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
                promoCode: req.body.promoCode
            });
            await newUser.save();
            return res.status(200).json({
                message: "Registration Successful"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    };
    static async Login(req, res) {
        try {
            const {email, password: candidatePassword} = req.body;
            const user = await users.findOne({ email: req.body.email }).lean();
            if(!user){
                return res.status(404).json({
                    message: "User does not exist",
                    error: true
                });
            }
            const passwordMatch = bcrypt.compare(req.body.password, user.password);
            if(!passwordMatch){
                return res.status(404).json({
                    message: "Invalid Credentials",
                    error: true
                });
            }
            const { password, ...loggedInUser } = user;
            return res.status(200).json({
                data: loggedInUser,
                message: "Login Successful",
                error: false
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: true,
                serverMessage: err.message
            });
        }
    };
    static async updateUser(req, res) {
      
        try {
          const {fullName, phoneNumber} = req.body;
          const {userId} = req.params
          // Update user details
          const result = await users.updateOne({  _id: new mongoose.Types.ObjectId(req.params.userId) }, {fullName,phoneNumber});
      
          if (result) {
            return res.status(200).json({
                message: "Updated Successfully"
            });
          } else {
            return res.status(404).json({
                message: "Failed to Update",
                error: true
            });
          }
        } catch (err) {
          return res.status(500).json({
            message: "Internal server error",
            error: true,
            serverError: err.message
          });
        } 
      }
}

module.exports = User;