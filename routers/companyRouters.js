const express = require("express");
const router = express.Router();

const companyControllers = require("../controllers/companyControllers");
const middlewareController = require("../controllers/middlewareController");

//get-all cty
router.get(
  "/get-all-company",
  middlewareController.verifyToken,
  companyControllers.getAllCompany
);
//get chi tiết cty
router.post(
  "/get-company/:id",
  middlewareController.verifyToken,
  companyControllers.getCompany
);
//tạo cty
router.post(
  "/create-company/",
  middlewareController.verifyToken,
  companyControllers.createCompany
);
//cập nhật cty
router.put(
  "/updata-company/:id",
  middlewareController.verifyToken,
  companyControllers.updataCompany
);
//xoa cty
router.delete(
  "/delete-company/:id",
  middlewareController.verifyToken,
  companyControllers.delCompany
);

//===
//get-all chi nhánh
router.post(
  "/get-all-branch",
  middlewareController.verifyToken,
  companyControllers.getAllBranch
);
//get chi nhánh chi tiết
router.post(
  "/get-branch/:id",
  middlewareController.verifyToken,
  companyControllers.getBranch
);

//đọc chi nhánh theo cty
router.post(
  "/get-branch-byChi",
  middlewareController.verifyToken,
  companyControllers.getBranchByChir
);

//tạo chi nhánh
router.post(
  "/create-branch",
  middlewareController.verifyToken,
  companyControllers.createBranch
);
//cập nhật chi nhánh
router.put(
  "/updata-branch/:id",
  middlewareController.verifyToken,
  companyControllers.updateBranch
);
//xoa chi nhanh
router.delete(
  "/delete-branch/:id",
  middlewareController.verifyToken,
  companyControllers.deleteBranch
);

//===
//get-all phòng ban
router.post(
  "/get-all-department",
  middlewareController.verifyToken,
  companyControllers.getAllDepartment
);
//get chi tiết phòng ban
router.post(
  "/get-department/:id",
  middlewareController.verifyToken,
  companyControllers.getDepartment
);

//đọc phòng ban theo công ty và chi nhánh
router.post(
  "/get-department-bychi",
  middlewareController.verifyToken,
  companyControllers.getDepartmentByChir
);

//lấy phòng ban theo mõi chi nhánh
router.post(
  "/get-department-only",
  middlewareController.verifyToken,
  companyControllers.getDepartmentOnly
);

//tạo phòng ban
router.post(
  "/create-department/",
  middlewareController.verifyToken,
  companyControllers.createDepartment
);
//cập nhật phòng ban
router.put(
  "/updata-department/:id",
  middlewareController.verifyToken,
  companyControllers.updateDepartment
);
//xoa phòng ban
router.delete(
  "/delete-department/:id",
  middlewareController.verifyToken,
  companyControllers.deleteDepartment
);

//===
//get-all nhóm
router.get(
  "/get-all-group",
  middlewareController.verifyToken,
  companyControllers.getAllGroup
);
//get chi tiết nhóm
router.post(
  "/get-group/:id",
  middlewareController.verifyToken,
  companyControllers.getGroup
);

//đọc tên nhóm theo cty chi nhánh phòng ban
router.post(
  "/get-group-bychir/",
  middlewareController.verifyToken,
  companyControllers.GroupByChi
);

//lấy nhóm theo mõi phòng ban
router.post(
  "/get-group-only/",
  middlewareController.verifyToken,
  companyControllers.getGroupOnly
);

//tạo nhóm
router.post(
  "/create-group/",
  middlewareController.verifyToken,
  companyControllers.createGroup
);
//cập nhật nhóm
router.put(
  "/updata-group/:id",
  middlewareController.verifyToken,
  companyControllers.updateGroup
);
//xoa nhóm
router.delete(
  "/delete-group/:id",
  middlewareController.verifyToken,
  companyControllers.deleteGroup
);

module.exports = router;
