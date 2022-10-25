//DB models
const StaffModel = require("../models/staffModel");
//time
const moment = require("moment");
const datass = require("../data/inputdata.json");

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
      const data = await StaffModel.find({ Working: "Thôi việc" }).count();

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
        statusWorking: "HDLD",
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
      const data = await StaffModel.find({ statusWorking: "HDTV" }).count();

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
      const d = new Date(1983, 01, 05);

      const data = await StaffModel.find({
        $expr: {
          $and: [
            {
              $eq: [
                {
                  $month: "$DateOfBirth",
                },
                1,
              ],
            },
          ],
        },
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
        $expr: {
          $and: [
            {
              $eq: [
                {
                  $month: "$DateOfBirth",
                },
                d.getMonth(),
              ],
            },
          ],
        },
      });

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  birthdayToday: async (req, res) => {
    const d = new Date();
    try {
      const data = await StaffModel.find({
        $expr: {
          $and: [
            {
              $eq: [
                {
                  $month: "$DateOfBirth",
                },
                d.getMonth(),
              ],
            },
            {
              $eq: [
                {
                  $dayOfMonth: "$DateOfBirth",
                },
                d.getDate(),
              ],
            },
          ],
        },
      });

      return res.status(200).json({ data });
    } catch (error) {
      console.log(error);
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
      });

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
};

module.exports = statisticalControllers;
