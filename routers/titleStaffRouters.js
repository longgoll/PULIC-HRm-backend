const express = require("express");
const router = express.Router();

const titleStaffControllers = require("../controllers/titleStaffControllers");
const middlewareController = require("../controllers/middlewareController");

//đọc tất cả
router.get(
  "/get-all-title-staff",
  middlewareController.verifyToken,
  titleStaffControllers.getAll
);
//đọc theo id
router.post(
  "/get-id-title-staff",
  middlewareController.verifyToken,
  titleStaffControllers.getbyID
);
//tạo
router.post(
  "/create-title-staff",
  middlewareController.verifyToken,
  titleStaffControllers.create
);
//cập nhật
router.put(
  "/update-title-staff/:id",
  middlewareController.verifyToken,
  titleStaffControllers.update
);
//xóa
router.delete(
  "/del-title-staff/:id",
  middlewareController.verifyToken,
  titleStaffControllers.del
);

module.exports = router;
