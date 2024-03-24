const redis = require("../config/redis/redisconfig");
const apiHttpStatusCodes = require("../utils/apiStatusCode");

class OtpController {
  static async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;
      let getOtp = await redis.get(email);

      // --| Return invalid OTP if OTP has expired or if OTP is not correct
      if (!getOtp || getOtp !== otp) {
        return res.status(apiHttpStatusCodes.STATUS_BAD_REQUEST).json({ error: true, message: "Invalid OTP" });
      }
      redis.del(email);
      // --| verify user in the db here i.e find user, update the verified flag to true
      return res.status(apiHttpStatusCodes.STATUS_OK).json({ error: false, message: "User verified successfully" });
    } catch (error) {
      
    }
  }
}

module.exports = OtpController;