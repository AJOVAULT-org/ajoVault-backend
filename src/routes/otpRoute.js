const express = require("express");
const router = express.Router();
const OtpController = require("../controllers/otpController");
const validate = require("../middlewares/validate");
const { verify } = require("../validators/auth");

router.post("/otp/verify", validate(verify), OtpController.verifyOtp);

module.exports = router;