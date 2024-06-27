const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  password: Joi.string().required()
});

const verify = Joi.object({
  email: Joi.string().required().email(),
  otp: Joi.string().required()
});

module.exports = { loginSchema, registerSchema, verify };
