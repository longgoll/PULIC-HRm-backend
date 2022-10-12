const express = require('express')
const router = express.Router()

const workScheduleControllers = require('../controllers/workScheduleControllers')

//lay tat ca lich
router.get('/get-all-work-schedule', workScheduleControllers.getAllWorkSchedule)
//lấy chi tiết lịch
router.get('/get-work-schedule/:id', workScheduleControllers.getWorkSchedule)
//tạo lịch
router.post('/create-work-schedule', workScheduleControllers.createWorkSchedule)
//cập nhật lịch
router.put('/updata-work-schedule', workScheduleControllers.updataWorkSchedule)
//xóa lịch
router.delete('/delete-work-schedule/:id', workScheduleControllers.deleteWorkSchedule)
router.post('/test', workScheduleControllers.test)

module.exports = router