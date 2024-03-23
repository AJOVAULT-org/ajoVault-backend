const user = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const existingUser = user.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new user({
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
            promoCode: req.body.promoCode
        });
        await newUser.save();
    }
    catch(err){
        console.error("Error registering user", err);
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
})