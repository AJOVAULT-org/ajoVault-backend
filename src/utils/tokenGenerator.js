const crypto = require("crypto");
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
  let expiry = expiry || 15 * 60 

  // --| Store key and value in redis for expiry amount of time
  await redis.set(key, otp, {EX: expiry});

  return otp;
}

const tokenGenerator = (size = 4, minutes = 15) => {
  let token = crypto.randomBytes(16);
  token = token.toString('hex').slice(0, size + 1);
}

module.exports = { generateOTP, tokenGenerator };