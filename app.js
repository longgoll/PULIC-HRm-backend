const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Routers
const accountRouter = require("./routers/accountRouters");
const authRouter = require("./routers/authRouters");
const staffRouter = require("./routers/staffRouters");
const companyRouters = require("./routers/companyRouters");
const workScheduleRouter = require("./routers/workScheduleRouter");
const titleStaffRouters = require("./routers/titleStaffRouters");
const DependentPersonRouters = require("./routers/DependentPersonRouters");
const bankControllers = require("./routers/bankControllers");
const statisticalRouters = require("./routers/statisticalRouters")

dotenv.config();

//conet DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
//===============================================================
const app = express();
//socket
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
//
app.use(cookieParser());
app.use(cors());
//socket
const server = http.createServer(app);

module.exports = io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

io.on("connection", (socket) => {
  //   socket.id = "dawdhiuahidawd"+1;
  console.log(`User Connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("ngat ket noi: " + socket.id);
  });

  socket.on("send_message", (data) => {
    socket.userName = data.message;
    socket.id = data.message;
    console.log(data);
    console.log(socket.id);
  });
});

//Run Router
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/v1", accountRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", staffRouter);
app.use("/api/v1", companyRouters);
app.use("/api/v1", workScheduleRouter);
app.use("/api/v1", titleStaffRouters);
app.use("/api/v1", DependentPersonRouters);
app.use("/api/v1", bankControllers);
app.use("/api/v1", statisticalRouters);

//===============================================================
server.listen(process.env.PORT || process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});
