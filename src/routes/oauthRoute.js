const express = require("express");
const OAuthController = require("../controllers/OAuthController");

const router = express.Router();

router.get("/google", OAuthController.googleOAuthHandler);

module.exports = router
