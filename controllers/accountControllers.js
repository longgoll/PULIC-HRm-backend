//jwt
var jwt = require("jsonwebtoken");

//hash password
const argon2 = require("argon2");

//DB models
const AccountModule = require("../models/account");

const accountController = {
  //lấy tất cả tài khoản
  getAllAccount: async (req, res) => {
    try {
      const data = await AccountModule.find(
        {},
        { email: 1, secret: 1, role: 1, Name: 1, islock: 1 }
      );

      return res.status(200).json({ success: true, data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //xóa
  DelAccount: async (req, res) => {
    const id = req.params.id;
    try {
      await AccountModule.findByIdAndDelete({ _id: id });

      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //khóa
  lockAccount: async (req, res) => {
    const id = req.params.id;
    try {
      await AccountModule.findByIdAndUpdate({ _id: id }, { islock: true });

      return res.status(200).json({ message: "Khoá tài khoản thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //reset
  resetAccount: async (req, res) => {
    const id = req.params.id;
    try {
      //All ok
      const hashPassword = await argon2.hash("12345678");

      await AccountModule.findByIdAndUpdate(
        { _id: id },
        { password: hashPassword, islock: false }
      );

      return res.status(200).json({ message: "reset khoản thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //lay thong tin
  getAccount: async (req, res) => {
    const id = req.params.id;
    try {
      const data = await AccountModule.findById(
        { _id: id },
        { Name: 1, role: 1 }
      );

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
};

module.exports = accountController;
