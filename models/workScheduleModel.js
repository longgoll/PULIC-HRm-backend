// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workScheduleSchema = new Schema({
    Name: {
        type: String,
        query: true
    },
    CodeName: {
        type: String,
        query: true
    },
    TimeStart: {
        type: Date,
        query: true
    },
    TimeEnd: {
        type: Date,
        query: true
    },
    DateWord: [{
        Monday: {
            type: Boolean,
            default: false,
        },
        Tuesday: {
            type: Boolean,
            default: false,
        },
        Wednesday: {
            type: Boolean,
            default: false,
        },
        Thursday: {
            type: Boolean,
            default: false,
        },
        Friday: {
            type: Boolean,
            default: false,
        },
        Saturday: {
            type: Boolean,
            default: false,
        },
        Sunday: {
            type: Boolean,
            default: false,
        }
    }],
    //lập lại
    //(không lập, hang tuan) (1 tuần/1 lần, 2/1, 3/1, 4/1)
    repeat: {
        type: Number,
        query: true
    },
    DayStart: {
        type: Date,
        query: true
    },
    DayEnd: {
        type: Date,
        query: true
    },
    //nân cao
    //check in sớm cho phép (phút)
    checkinEarly: {
        type: String,
        query: true
    },
    //check in muộn cho phép (phút)
    checkinLate: {
        type: String,
        query: true
    },
    //check out sớm cho phép (phút)
    checkoutEarly: {
        type: String,
        query: true
    },
    //check out muộn cho phép (phút)(mặc định vô hạn)
    checkoutLate: {
        type: String,
        query: true
    },
    //công làm tính theo (1 or 0.5)
    work: {
        type: Number,
        query: true
    }

}, { timestamps: true });
//
const workScheduleModule = mongoose.model('workSchedule', workScheduleSchema);
module.exports = workScheduleModule