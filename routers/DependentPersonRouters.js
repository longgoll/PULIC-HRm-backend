const express = require("express");
const router = express.Router();

const DependentPersonControllers = require("../controllers/DependentPersonControllers");
const middlewareController = require("../controllers/middlewareController");

//tạo
router.post(
  "/create-dependent-person",
  middlewareController.verifyToken,
  DependentPersonControllers.craete
);
//cập nhật
router.put(
  "/update-dependent-person/:id",
  middlewareController.verifyToken,
  DependentPersonControllers.update
);
//lấy tất cả phaan trang
router.post(
  "/get-all-dependent-person",
  middlewareController.verifyToken,
  DependentPersonControllers.getAllpage
);

//lay tat ca du lieu xuat file
router.get(
  "/get-dependent-person-ex",
  middlewareController.verifyToken,
  DependentPersonControllers.getAllEX
);
//lay tat ca du lieu xuat file so
router.get(
  "/get-dependent-person-ex-number",
  middlewareController.verifyToken,
  DependentPersonControllers.getAllEXNumber
);

//lay theo id của nhân viên
router.get(
  "/get-by-id-staff-dependent-person/:id",
  middlewareController.verifyToken,
  DependentPersonControllers.getAllbyIDStaff
);

//theo ID
router.get(
  "/get-by-id-dependent-person/:id",
  middlewareController.verifyToken,
  DependentPersonControllers.getByID
);
//xóa
router.delete(
  "/del-dependent-person/:id",
  middlewareController.verifyToken,
  DependentPersonControllers.del
);

//tim kiếm theo key
router.post(
  "/search-dependent-person-by-key",
  middlewareController.verifyToken,
  DependentPersonControllers.searchDependentPersonByKey
);


module.exports = router;
