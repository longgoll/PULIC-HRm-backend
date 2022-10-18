const dataBank = require("../data/bank.json");

const bankControllers = {
  //lấy tất cả danh sách ngân hàng
  getAllBank: async (req, res) => {
    try {
      // res.status(200).json({message:'ok'})
      return res.status(200).json({success: true, dataBank});
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
};

module.exports = bankControllers;
