const User = require('../controllers/registerController');

const express = require('express');

const router = express.Router();

router.post('/api/v1/auth/register', User.Register);