const User = require('../controllers/userController');

const express = require('express');

const router = express.Router();

router.post('/auth/register', User.Register);
router.post('/auth/login', User.Login);
router.patch('/auth/updateUser/:userId', User.updateUser);

module.exports = router;