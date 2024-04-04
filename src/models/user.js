const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    promoCode: {
        type: String,
        required: false
    },
    email_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    transaction_pin: {
        type: String
    }
});

const user = mongoose.model('user', userSchema);
module.exports = user;