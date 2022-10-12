// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    //công ty
    Company: {
        type: String,
        query: true
    },

}, { timestamps: true });
//
const CompanyModule = mongoose.model('Company', CompanySchema);
module.exports = CompanyModule