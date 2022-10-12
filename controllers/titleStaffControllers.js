const vi = require("../language/vi.json");
const titleStaffModel = require("../models/titleStaffModel");
const staffModel = require("../models/staffModel");

const titleStaffControllers = {
  //lấy tất cả chức danh
  getAll: async (req, res) => {
    try {
      const data = await titleStaffModel.find();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //lấy theo id
  getbyID: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await titleStaffModel.findById(id);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //tạo mới
  create: async (req, res) => {
    const { Title } = req.body;

    if (!Title) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng nhập chức danh" });
    }

    try {
      const datalow = await titleStaffModel.find({ Title: Title });
      if (datalow.length > 0) {
        return res
          .status(401)
          .json({ success: false, message: "Chức danh đã tồn tại" });
      }
      //
      const data = await titleStaffModel({ Title });

      await data.save();

      return res
        .status(200)
        .json({ success: true, message: "Tạo chức danh thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //cập nhật
  update: async (req, res) => {
    const id = req.params.id;
    const { Title } = req.body;

    try {
      await titleStaffModel.findByIdAndUpdate({ _id: id }, { Title });

      return res
        .status(200)
        .json({ success: true, message: "Cập nhật chức danh thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //xóa
  del: async (req, res) => {
    const id = req.params.id;

    try {
      const dataTitleStaff = await titleStaffModel.findById({ _id: id });
      //xác nhận còn nhân viên nào không trước khi xóa
      const dataStaff = await staffModel
        .find({
          titleStaff: dataTitleStaff.Title,
        })
        .count();

      if (dataStaff > 0) {
        return res.status(401).json({
          success: false,
          message: "Còn nhân viên mang chức danh này không thể xóa",
        });
      }

      await dataTitleStaff.delete();

      return res
        .status(200)
        .json({ success: true, message: "Xoá chức danh thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
};

module.exports = titleStaffControllers;
