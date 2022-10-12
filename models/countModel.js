// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountSchema = new Schema({
    CountStaffID: {
        type: Number,
        query: true,
        default: 0,
    },
}, { timestamps: true });
//
const CountModule = mongoose.model('Count', CountSchema);
module.exports = CountModule