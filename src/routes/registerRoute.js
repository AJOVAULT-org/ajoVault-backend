const User = require('../controllers/registerController');

const express = require('express');

const router = express.Router();

router.post('/auth/register', User.Register);