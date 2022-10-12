// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companyDepartmentSchema = new Schema({
    //phong ban
    department: {
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

}, { timestamps: true });
//
const companyDepartmentModule = mongoose.model('companyDepartment', companyDepartmentSchema);
module.exports = companyDepartmentModule