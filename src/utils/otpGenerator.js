const redis = require("../config/redis/redisconfig");

/**
@param {string} key - The email of user getting the OTP
@param {number} length - Length of the OTP
@param {number} expiry - How long the OTP will last in seconds
*/
const generateOTP = async (key, length = 4, expiry) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    const randVal = Math.floor(Math.random() * 10);   
    otp += randVal.toString();
  }

  // --| Expiry is in seconds
  const expiration = expiry || 15 * 60;

  // --| Store key and value in redis for expiry amount of time
  await redis.set(key, otp, {EX: expiration});

  return otp;
};

module.exports = generateOTP;
