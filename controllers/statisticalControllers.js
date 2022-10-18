//DB models
const StaffModel = require("../models/staffModel");
//time
const moment = require("moment");

const statisticalControllers = {
  //tổng số nhân viên đang làm
  getNumberDoing: async (req, res) => {
    try {
      const data = await StaffModel.find({ Working: "Đang làm" }).count();

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //tổng số nhân viên đã nghỉ
  getNumberQuit: async (req, res) => {
    try {
      const data = await StaffModel.find({ Working: "Nghỉ làm" }).count();

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //tổng số nhân viên HĐ chính thức
  getNumberOfficialContract: async (req, res) => {
    try {
      const data = await StaffModel.find({
        statusWorking: "Chính thức",
      }).count();

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //tổng số nhân viên HĐ thử việc
  getNumberProbationaryContracts: async (req, res) => {
    try {
      const data = await StaffModel.find({ statusWorking: "Thử việc" }).count();

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //sinh nhật
  birthday: async (req, res) => {
    try {
      const d = new Date();
      const data = await StaffModel.find({
        $and: [
          { DateOfBirth: { $gte: moment(d).format("YYYY-MM-DD") } },
          { DateOfBirth: { $lte: moment(d).format("YYYY-MM-DD") } },
        ],
      }).count();

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  SignedContract: async (req, res) => {
    try {
      const d = new Date();
      const data = await StaffModel.find({
        $and: [
          { DateStartWork: { $gte: moment(d).format("YYYY-MM-DD") } },
          { DateStartWork: { $lte: moment(d).format("YYYY-MM-DD") } },
        ],
      }).count();

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //get all sinh nhật
  birthdayGellAll: async (req, res) => {
    try {
      const d = new Date();
      const data = await StaffModel.find({
        $and: [
          { DateOfBirth: { $gte: moment(d).format("YYYY-MM-DD") } },
          { DateOfBirth: { $lte: moment(d).format("YYYY-MM-DD") } },
        ],
      }, {})

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //get tất cả hợp đồng cần ký
  SignedContractGellAll: async (req, res) => {
    try {
      const d = new Date();
      const data = await StaffModel.find({
        $and: [
          { DateStartWork: { $gte: moment(d).format("YYYY-MM-DD") } },
          { DateStartWork: { $lte: moment(d).format("YYYY-MM-DD") } },
        ],
      })

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
};

module.exports = statisticalControllers;
