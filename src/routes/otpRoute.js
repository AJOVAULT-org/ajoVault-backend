const express = require("express");
const router = express.Router();
const OtpController = require("../controllers/otpController");

router.post("/otp/verify", OtpController.verifyOtp);

module.exports = router;