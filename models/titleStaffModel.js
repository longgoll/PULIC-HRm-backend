// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const titleStaffSchema = new Schema({
    Title: {
        type: String,
        default: false
    },
}, { timestamps: true });
//
const titleStaffModule = mongoose.model('titleStaff', titleStaffSchema);
module.exports = titleStaffModule