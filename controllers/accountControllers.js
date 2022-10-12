//jwt
var jwt = require('jsonwebtoken')

//DB models
const AccountModule = require('../models/account')

const accountController = {
    //lấy tất cả tài khoản
    getAllAccount: async (req, res) => {

        try {
            const data = await AccountModule.find()

            res.status(200).json({ success: true, data: data })
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Vui lòng thử lại sau' })
        }
    }
}

module.exports = accountController;