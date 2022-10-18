//hash password
const argon2 = require("argon2");

//jwt
var jwt = require("jsonwebtoken");

//DB models
const AccountModule = require("../models/account");

//2FW
const speakeasy = require("speakeasy");

//ngon nu
const vi = require("../language/vi.json");
const en = require("../language/en.json");
const jp = require("../language/japan.json");
const langArray = [en, vi, jp];

const authControllers = {
  //tao access token
  generateAccessToken: (user) => {
    return jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.ACCESSTOKEN_MK,
      { expiresIn: "1d" }
    );
  },

  //tao refresh token
  generateRefreshToken: (user) => {
    return jwt.sign(
      { _id: user._id, email: user.email },
      process.env.REFRESTOKEN_MK,
      { expiresIn: "1d" }
    );
  },

  //đăng kí tài khoản tesst
  test: async (req, res) => {
    const email = "admin@gmail.com";
    const password = "12345678";

    if (!email) {
      return res.status(400).json({ success: false, message: "" });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "",
      });
    }

    //check email
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(mailformat)) {
      return res
        .status(400)
        .json({ success: false, message: "Không đúng định dạng email" });
    }

    //check pass
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "mật khẩu phải trên 8 ký tự",
      });
    }

    try {
      //kiểm tra tài khoản có tồn tại không
      const User = await AccountModule.findOne({ email }).count();

      if (User > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Tài khoản đã tồn tại" });
      }
      //Tao mã sác thực 2 lớp
      // Create temporary secret until it it verified
      const temp_secret = speakeasy.generateSecret();
      // Send user id and base32 key to user
      var url = speakeasy.otpauthURL({
        secret: temp_secret.ascii,
        label: email,
        issuer: "OHR",
      });

      //All ok
      const hashPassword = await argon2.hash(password);
      const newUser = new AccountModule({
        email,
        password: hashPassword,
        role,
        Name,
        islock,
        secret: {
          ascii: temp_secret.ascii,
          hex: temp_secret.hex,
          base32: temp_secret.base32,
          otpauth_url: url,
        },
      });
      //luu vao DB
      await newUser.save();

      return res.status(201).json({ success: true, message: "Tao thanh cong" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //đăng kí tài khoản
  registerAccount: async (req, res) => {
    const { email, password, role, Name } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập email" });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập mật khẩu",
      });
    }

    //check email
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(mailformat)) {
      return res
        .status(400)
        .json({ success: false, message: "Không đúng định dạng email" });
    }

    //check pass
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu phải trên 8 ký tự",
      });
    }

    try {
      //kiểm tra tài khoản có tồn tại không
      const User = await AccountModule.findOne({ email }).count();

      if (User > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Tài khoản đã tồn tại" });
      }
      //Tao mã sác thực 2 lớp
      // Create temporary secret until it it verified
      const temp_secret = speakeasy.generateSecret();
      // Send user id and base32 key to user
      var url = speakeasy.otpauthURL({
        secret: temp_secret.ascii,
        label: email,
        issuer: "OHR",
      });

      //All ok
      const hashPassword = await argon2.hash(password);
      const newUser = new AccountModule({
        email,
        password: hashPassword,
        role,
        Name,
        // islock,
        secret: {
          ascii: temp_secret.ascii,
          hex: temp_secret.hex,
          base32: temp_secret.base32,
          otpauth_url: url,
        },
      });
      //luu vao DB
      await newUser.save();

      return res.status(201).json({ success: true, message: "Tạo thành công" });
    } catch (error) {
      // console.log(error);
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //đăng nhập
  loginAccount: async (req, res) => {
    // console.log('co ');
    const { email, password } = req.body;
    // const langIndex = req.lang

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập email" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "vui lòng nhập mật khẩu" });
    }

    //check email
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(mailformat)) {
      return res
        .status(400)
        .json({ success: false, message: "Email không hợp lệ" });
    }

    //check pass
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu không hợp lệ" });
    }

    try {
      //kiểm tra tài khoản có tồn tại không
      const user = await AccountModule.findOne({ email });
      // console.log(user.password);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Kiểm tra lại tài khoản và mật khẩu",
        });
      }
      //kiem tra password
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: "Kiểm tra lại tài khoản và mật khẩu",
        });
      }
      //All good
      const accessToken = await authControllers.generateAccessToken(user);
      const refreshToken = await authControllers.generateRefreshToken(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Thử lại sau" });
    }
  },

  //xac thuc dang nhap
  accuracylogin: async (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Chúng tôi không thể xác thực",
      });
    }

    //Bearer
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESSTOKEN_MK, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Chúng tôi không thể xác thực",
        });
      }

      return res.status(200).json({ message: "xac thuc success" });
    });
  },

  requestRefreshToken: async (req, res) => {
    // const langIndex = req.lang;
    //lấy token refresh token từ người dùng
    const refreshToken = req.cookies.refreshToken;
    //nếu refresh token không tồn tại
    if (!refreshToken)
      return res.status(401).json({ message: "Chúng tôi không thể xác thực" });
    jwt.verify(refreshToken, process.env.REFRESTOKEN_MK, async (err, user) => {
      //kiểm tra refresh token hết hạng
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Xác thực thất bại",
        });
      }
      //tạo mới access token cho người dùng
      const newAccessToken = await authControllers.generateAccessToken(user);
      const newRefreshToken = await authControllers.generateRefreshToken(user);
      //tạo mới refresh token cho người dùng
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      //chả access token cho người dùng
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  //==========

  //kiểm tra có bật 2FA

  check2FA: async (req, res, next) => {
    const id = req.user._id;
    const langIndex = req.lang;

    try {
      const data = await AccountModule.findById(id, { TowFA: 1, _id: 0 });

      if (data.TowFA) {
        next();
      } else {
        return res
          .status(403)
          .json({ success: false, message: langArray[langIndex].Check2FA });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //bật 2 lớp bảo mật
  activated2FA: async (req, res) => {
    const id = req.user._id;
    const langIndex = req.lang;

    try {
      await AccountModule.findByIdAndUpdate(id, { TowFA: true });

      res.status(200).json({
        success: true,
        message: langArray[langIndex].TurnOn_2FA_success,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //send role
  sendRole: async (req, res) => {
    try {
      return res
        .status(200)
        .json({ success: true, role: req.user.role, UserID: req.user._id });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //tắt 2 lớp bảo mật
  TurnOff2FA: async (req, res) => {
    const id = req.user._id;
    const langIndex = req.lang;

    try {
      await AccountModule.findByIdAndUpdate(id, { TowFA: false });

      res.status(200).json({
        success: true,
        message: langArray[langIndex].TurnOff_2FA_success,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //in mã qr
  printQR: async (req, res) => {
    const id = req.user._id;

    try {
      const data = await AccountModule.findById(id, {
        secret: { otpauth_url: 1 },
        _id: 0,
      });

      return res
        .status(200)
        .json({ success: true, message: data.secret.otpauth_url });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //nhận mã 2FA
  printCode2FA: async (req, res) => {
    const id = req.user._id;

    try {
      const data = await AccountModule.findById(id, {
        secret: { base32: 1 },
        _id: 0,
      });

      return res
        .status(200)
        .json({ success: true, message: data.secret.base32 });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //xác thực mã authenticator
  validate: async (req, res) => {
    const { otp } = req.body;
    const id = req.user._id;

    //kiem tra ma token xác thực có trống không
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: langArray[langIndex].Enter_Auth_Code_2FA,
      });
    }

    try {
      //đọc dữ liệu
      const dataSecret = await AccountModule.findById(id, {
        secret: 1,
        _id: 0,
      });
      //xác thực mã OTP
      const { base32: secret } = dataSecret.secret;
      // Returns true if the token matches
      const tokenValidates = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token: otp,
        window: 1,
      });
      if (tokenValidates) {
        return res.status(200).json({
          success: true,
          message: langArray[langIndex].Auth_successful_2FA,
        });
      } else {
        return res.status(203).json({
          success: false,
          message: langArray[langIndex].Auth_unsuccessful_2FA,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
};

module.exports = authControllers;
