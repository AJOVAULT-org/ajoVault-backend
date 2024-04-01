const User = require('../controllers/userController');

const express = require('express');

const router = express.Router();

router.post('/auth/register', User.Register);
router.post('/auth/login', User.Login);


module.exports = router;