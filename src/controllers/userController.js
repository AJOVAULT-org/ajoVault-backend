const users = require('../models/user');
const bcrypt = require('bcrypt');
class User {
    static async Register(req, res) {
        try {
            const existingUser = await users.findOne({ email: req.body.email });
            console.log(existingUser);
            if (existingUser) {
                return res.status(409).json({
                    message: "User already exists"
                });
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new users({
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
                promoCode: req.body.promoCode
            });
            await newUser.save();
            return res.status(200).json({
                message: "Registration Successful"
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    };
}

module.exports = User;