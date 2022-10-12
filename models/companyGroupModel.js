// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companyGroupSchema = new Schema({
    //nhóm
    group: {
        type: String,
        query: true
    },
    //con của cty
    ChiCompany: {
        type: String,
        query: true
    },
     //con của chi nhánh
     ChiCompanyBranch: {
        type: String,
        query: true
    },
    //con của phong ban
    ChiDepartment: {
        type: String,
        query: true
    },

}, { timestamps: true });
//
const companyGroupModule = mongoose.model('companyGroup', companyGroupSchema);
module.exports = companyGroupModule