// var CronJob = require('cron').CronJob;

const workScheduleModel = require('../models/workScheduleModel')
const io = require('../app')

// const d = new Date();
// const giochin = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 02, 00)
// const cheichinSom = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 17, 00, 00)
// const cheichinmuon = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 00, 00)
// // console.log(cheichinQD);
// if (giochin < cheichinSom) {
//     console.log('som g');
// } else if(giochin <= cheichinmuon){
//     console.log('dung g');
// }else{
//     console.log('tre g');
// }

let a

const datatime = [
    {
        Title: {
            time: '14:19:00'
        },
    },
    {
        Title: {
            time: '14:21:10'
        },
    },
    {
        Title: {
            time: '14:21:20'
        },
    }

]

let key = 0
let leg = datatime.length

// Object.keys(datatime).forEach(key => {
//     timeset = datatime[key].Title.time;
// })


var clock = setInterval(() => {
    let date = new Date(),
        h = date.getHours()
    m = date.getMinutes()
    s = date.getSeconds()

    h = h == 0 ? h = 12 : h
    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s

    const time = `${h}:${m}:${s}`

    // io.sockets.emit('time', {time: time})

    // if (key < leg) {
    //     if (time <= datatime[key].Title.time) {
    //         console.log(time);
    //         if (time == datatime[key].Title.time) {
    //             console.log('bao thuc' + key);
    //             key = key + 1
    //         }
    //     } else {
    //         key = key+1
    //         console.log('gio hen nho hon now '+key);
    //     }
    // } else {
    //     console.log('ket thuc');
    //     clearInterval(clock);
    // }

}, 1000);

// clearInterval(clock);


const workSchedule = {
    //lấy tất cả
    getAllWorkSchedule: async (req, res) => {
        try {
            const data = await workScheduleModel.find()

            return res.status(200).json({ success: true, data })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Vui lòng thử lại sau' })
        }
    },
    //lấy chi tiết lịch
    getWorkSchedule: async (req, res) => {
        const id = req.params.id

        try {
            const data = await workScheduleModel.findById({ _id: id })

            return res.status(200).json({ success: true, data })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Vui lòng thử lại sau' })
        }
    },
    //tạo lịch
    createWorkSchedule: async (req, res) => {
        const now = new Date();
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 08, 30, 0, 0);
        const e = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 30, 0, 0);

        const {
            Name,
            CodeName,
            TimeStart,
            TimeEnd,
            Monday,
            Tuesday,
            Wednesday,
            Friday,
            Saturday,
            Sunday,
            repeat,
            checkinEarly,
            checkinLate,
            checkoutEarly,
            checkoutLate,
            work,
        } = req.body

        if (!Name) {
            return res.status(400).json({ success: false, message: 'vui lòng thêm tên ca' })
        }

        if (!CodeName) {
            return res.status(400).json({ success: false, message: 'vui lòng thêm mã ca' })
        }

        if (!checkinEarly) {
            return res.status(400).json({ success: false, message: 'vui lòng thêm checkin sớm' })
        }

        if (!checkinLate) {
            return res.status(400).json({ success: false, message: 'vui lòng thêm checkin muộn' })
        }

        if (!checkoutEarly) {
            return res.status(400).json({ success: false, message: 'vui lòng thêm checkout sớm' })
        }

        if (!checkoutLate) {
            return res.status(400).json({ success: false, message: 'vui lòng thêm checkout muộn' })
        }

        if (!work) {
            return res.status(400).json({ success: false, message: 'vui lòng thêm công làm' })
        }

        try {

            const dataWorkSchedule = await workScheduleModel.find({ Name }).count()

            if (dataWorkSchedule > 0) {
                return res.status(400).json({ success: false, message: 'Tên ca đã tồn tại' })
            }

            const data = await workScheduleModel({
                Name,
                CodeName,
                TimeStart: d,
                TimeEnd: e,
                DateWord: [{
                    Monday,
                    Tuesday,
                    Wednesday,
                    Friday,
                    Saturday,
                    Sunday,
                }],
                repeat,
                checkinEarly,
                checkinLate,
                checkoutEarly,
                checkoutLate,
                work,
            })

            await data.save()

            return res.status(200).json({ success: true, message: 'Lưu thành công' })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Vui lòng thử lại sau' })
        }
    },

    //cập nhật lịch
    updataWorkSchedule: async (req, res) => {
        const id = req.params.id
        const now = new Date();
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 08, 30, 0, 0);
        const e = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 30, 0, 0);

        const {
            Name,
            CodeName,
            TimeStart,
            TimeEnd,
            Monday,
            Tuesday,
            Wednesday,
            Friday,
            Saturday,
            Sunday,
            repeat,
            checkinEarly,
            checkinLate,
            checkoutEarly,
            checkoutLate,
            work,
        } = req.body

        try {
            await workScheduleModel.findByIdAndUpdate({ _id: id }, {
                Name,
                CodeName,
                TimeStart: d,
                TimeEnd: e,
                DateWord: [{
                    Monday,
                    Tuesday,
                    Wednesday,
                    Friday,
                    Saturday,
                    Sunday,
                }],
                repeat,
                checkinEarly,
                checkinLate,
                checkoutEarly,
                checkoutLate,
                work,
            })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Vui lòng thử lại sau' })
        }
    },

    //xóa lịch
    deleteWorkSchedule: async (req, res) => {
        const id = req.params.id

        try {
            await workScheduleModel.findByIdAndDelete({ _id: id })

            return res.status(200).json({ success: true, message: 'Xóa thành công' })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Vui lòng thử lại sau' })
        }
    },

    test: async (req, res) => {
        const io = req.io
        const on = req.body.on
        
        if (on != 1) {

             a = setInterval(() => {
                let date = new Date(),
                    h = date.getHours()
                m = date.getMinutes()
                s = date.getSeconds()

                h = h == 0 ? h = 12 : h
                h = h < 10 ? "0" + h : h
                m = m < 10 ? "0" + m : m
                s = s < 10 ? "0" + s : s

                const time = `${h}:${m}:${s}`
                io.emit('time', { message: time })

            }, 1000);
            return res.status(200).json({ message: 'bat' })
        } else {
            clearInterval(a);
            return res.status(200).json({ message: 'tat' })
        }
        
    }
}

module.exports = workSchedule