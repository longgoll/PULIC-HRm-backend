const express = require('express')
const router = express.Router()

const accountController = require('../controllers/accountControllers')
const middlewareController = require('../controllers/middlewareController')

//Láy tất cả tài khoản
router.get('/all-user', middlewareController.verifyToken, accountController.getAllAccount)
//xóa tài khoản
router.delete('/del-user/:id', middlewareController.verifyToken, accountController.DelAccount)
//khóa tài khoản
router.post('/lock-user/:id', middlewareController.verifyToken, accountController.lockAccount)
//reset tài khoản
router.post('/reset-user/:id', middlewareController.verifyToken, accountController.resetAccount)
//lay thong tin
router.get('/get-user/:id', middlewareController.verifyToken, accountController.getAccount)

module.exports = router