const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareController");

//đăng kí tài khoản tesst
router.get("/test", authControllers.test);
//đăng kí tài khoản
router.post("/register", authControllers.registerAccount);
//đăng nhập
router.post("/login", authControllers.loginAccount);
//kích hoạt 2FA
router.post("/activated2FA", authControllers.activated2FA);
//refresh token
router.post("/refresh-token", authControllers.requestRefreshToken);
//bật 2 lớp bảo mật
router.post(
  "/on-2fa",
  middlewareController.verifyToken,
  authControllers.activated2FA
);
//Tắt 2 lớp bảo mật
router.post(
  "/off-2fa",
  middlewareController.verifyToken,
  authControllers.check2FA,
  authControllers.TurnOff2FA
);
//in mã qr
router.get(
  "/printq-auth",
  middlewareController.verifyToken,
  authControllers.check2FA,
  authControllers.printQR
);
//nhan mã auth 2fa
router.get(
  "/printcode2fa-auth",
  middlewareController.verifyToken,
  authControllers.check2FA,
  authControllers.printCode2FA
);
//Xác thực mã OTP
router.post(
  "/validate",
  middlewareController.verifyToken,
  authControllers.check2FA,
  authControllers.validate
);

//xác thực login
router.post("/accuracy-login", authControllers.accuracylogin);
module.exports = router;
