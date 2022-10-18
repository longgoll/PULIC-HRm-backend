const express = require("express");
const router = express.Router();

const bankControllers = require("../controllers/bankControllers");
const middlewareController = require("../controllers/middlewareController");

//lấy tất cả danh sách ngân hàng
router.get(
  "/get-all-bank",
  middlewareController.verifyToken,
  bankControllers.getAllBank
);

module.exports = router;
