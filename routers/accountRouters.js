const express = require('express')
const router = express.Router()

const accountController = require('../controllers/accountControllers')
const middlewareController = require('../controllers/middlewareController')

//Láy tất cả tài khoản
router.get('/all-user', middlewareController.verifyToken, accountController.getAllAccount)


module.exports = router