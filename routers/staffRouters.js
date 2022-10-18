const express = require("express");
const router = express.Router();

const staffControllers = require("../controllers/staffControllers");
const middlewareController = require("../controllers/middlewareController");
// const middlewareLanguage = require('../controllers/middlewareLanguage')
//viet tắt middlewar
// const Language = middlewareLanguage.verifyCookiesLanguage

//reset mã số nhân viên
router.post(
  "/reset-number-id",
  middlewareController.verifyToken,
  staffControllers.resetNumberID
);
//THêm mới nhân viên
router.post(
  "/create-staff",
  middlewareController.verifyToken,
  staffControllers.createStaff
);
//cập nhận nhân viên
router.put(
  "/updata-staff/:id",
  middlewareController.verifyToken,
  staffControllers.updataStaff
);
//xóa nhan vien
router.delete(
  "/delete-staff/:id",
  middlewareController.verifyToken,
  staffControllers.delStaff
);
//lấy tất cả nhân viên
router.post(
  "/get-staff-list",
  middlewareController.verifyToken,
  staffControllers.getAllStaff
);
//lấy tất cả nhân viên EX
router.get(
  "/get-staff-ex",
  middlewareController.verifyToken,
  staffControllers.getAllSEX
);

//lấy tất cả nhân viên EX number
router.get(
  "/get-staff-ex-number",
  middlewareController.verifyToken,
  staffControllers.getAllSEXNumber
);

//lấy thông tin nhân viên
router.get(
  "/get-staff/:id",
  middlewareController.verifyToken,
  staffControllers.getStaff
);
//lấy thông tin nhân viên cho người phụ thuộc
router.get(
  "/get-staff-npt/:id",
  middlewareController.verifyToken,
  staffControllers.getStaffNPT
);
//tìm kiếm staff
router.post(
  "/search-staff",
  middlewareController.verifyToken,
  staffControllers.searchStaff
);
//tìm kiếm theo tên
router.post(
  "/search-staff-name",
  middlewareController.verifyToken,
  staffControllers.searchStaffByName
);

//bo loc
router.post(
  "/filter",
  middlewareController.verifyToken,
  staffControllers.filter
);

//xuất EX ra những thông tin cần thiết
router.get(
  "/get-staff-ex-custom1",
  middlewareController.verifyToken,
  staffControllers.EXcustom1
);

//cộng số người phụ thuộc
router.post(
  "/sum-dependent/:id",
  middlewareController.verifyToken,
  staffControllers.SumDependent
);

//cặp nhật lại số người phụ thuộc
router.post(
  "/update-sum-dependent/:id",
  middlewareController.verifyToken,
  staffControllers.updateSumDependent
);

//==========================================
//liệt kê người trong nhóm
router.post(
  "/get-group-staff",
  middlewareController.verifyToken,
  staffControllers.getGroupStaff
);

module.exports = router;