// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companyBranchSchema = new Schema({
    //Chi nhanh
    companyBranch: {
        type: String,
        query: true
    },
    //con của cty
    ChiCompany: {
        type: String,
        query: true
    },

}, { timestamps: true });
//
const companyBranchModule = mongoose.model('companyBranch', companyBranchSchema);
module.exports = companyBranchModule