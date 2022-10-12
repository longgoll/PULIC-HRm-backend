const express = require('express')
const router = express.Router()

const accountController = require('../controllers/accountControllers')
const middlewareController = require('../controllers/middlewareController')
const middlewareLanguage = require('../controllers/middlewareLanguage')
//viet tắt middlewar
const Language = middlewareLanguage.verifyCookiesLanguage

//Láy tất cả tài khoản
router.get('/all-user', Language, middlewareController.verifyToken, accountController.getAllAccount)


module.exports = router