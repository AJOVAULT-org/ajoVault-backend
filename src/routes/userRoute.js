const User = require("../controllers/userController");
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validators/auth");

const express = require("express");

const router = express.Router();

router.post("/auth/register", validate(registerSchema), User.Register);
router.post("/auth/login", validate(loginSchema), User.Login);
router.patch("/auth/updateUser/:userId", User.updateUser);
router.delete("/auth/deleteUser/:userId", User.deleteUser);

module.exports = router;