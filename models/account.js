// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    TowFA: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        query: true
    },
    password: {
        type: String,
        query: true
    },
    secret: {
        ascii: String,
        hex: String,
        base32: String,
        otpauth_url: String
    }
}, { timestamps: true });
//
const AccountModule = mongoose.model('Account', AccountSchema);
module.exports = AccountModule