const DependentPersonModel = require("../models/DependentPersonModel");

const DependentPersonControllers = {
  //Tạo người phụ thuộc
  craete: async (req, res) => {
    const {
      IDStaff,
      numberNV,
      nameStaff,
      nameDependentPerson,
      DateOfBirthDependentPerson,
      TaxCodeDependentPerson,
      typeCardIDDependentPerson,
      IDcard1DependentPerson,
      DateRangeIDcard1DependentPerson,
      IssuedbyIDcard1DependentPerson,
      numberOfPapers,
      RelationshipWithTaxpayers,
      FromMonth,
      ToTheMonth,
    } = req.body;

    if (!numberNV) {
      return res
        .status(401)
        .json({ success: false, message: "Vui lòng nhận mã nhân viên" });
    }

    if (!nameStaff) {
      return res
        .status(401)
        .json({ success: false, message: "Vui lòng nhận tên nhân viên" });
    }

    if (!IDcard1DependentPerson) {
      return res
        .status(401)
        .json({ success: false, message: "Vui lòng nhập CCCD/CMND NPT" });
    }

    if (!nameDependentPerson) {
      return res
        .status(401)
        .json({ success: false, message: "Vui lòng nhập Tên NPT" });
    }

    try {
      const dataDependentPersonModel = await DependentPersonModel.find({
        IDcard1DependentPerson,
      }).count();

      if (dataDependentPersonModel > 0) {
        return res.status(401).json({
          success: false,
          message: "Số CMND/CCCD người phụ thuộc đã tồn tại",
        });
      }

      const data = await DependentPersonModel({
        IDStaff,
        numberNV,
        nameStaff,
        nameDependentPerson,
        DateOfBirthDependentPerson,
        TaxCodeDependentPerson,
        typeCardIDDependentPerson,
        IDcard1DependentPerson,
        DateRangeIDcard1DependentPerson,
        IssuedbyIDcard1DependentPerson,
        numberOfPapers,
        RelationshipWithTaxpayers,
        FromMonth,
        ToTheMonth,
      });

      await data.save();

      return res
        .status(200)
        .json({ success: true, message: "Tạo người phụ thuộc thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //Chỉnh sửa người phụ thuộc
  update: async (req, res) => {
    const id = req.params.id;

    const {
      IDStaff,
      numberNV,
      nameStaff,
      nameDependentPerson,
      DateOfBirthDependentPerson,
      TaxCodeDependentPerson,
      typeCardIDDependentPerson,
      IDcard1DependentPerson,
      DateRangeIDcard1DependentPerson,
      IssuedbyIDcard1DependentPerson,
      numberOfPapers,
      RelationshipWithTaxpayers,
      FromMonth,
      ToTheMonth,
    } = req.body;

    try {
      const dataDependentPersonModel = await DependentPersonModel.find({
        IDcard1DependentPerson,
      }).count();

      if (dataDependentPersonModel > 1) {
        return res.status(401).json({
          success: false,
          message: "Số CMND/CCCD người phụ thuộc đã tồn tại",
        });
      }

      await DependentPersonModel.findById({ _id: id }).update({
        IDStaff,
        numberNV,
        nameStaff,
        nameDependentPerson,
        DateOfBirthDependentPerson,
        TaxCodeDependentPerson,
        typeCardIDDependentPerson,
        IDcard1DependentPerson,
        DateRangeIDcard1DependentPerson,
        IssuedbyIDcard1DependentPerson,
        numberOfPapers,
        RelationshipWithTaxpayers,
        FromMonth,
        ToTheMonth,
      });

      return res.status(200).json({
        success: true,
        message: "Cập nhật người phụ thuộc thành công",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  del: async (req, res) => {
    const id = req.params.id;

    try {
      await DependentPersonModel.findByIdAndDelete({ _id: id });

      return res.status(200).json({
        success: true,
        message: "Xóa người phụ thuộc thành công",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //lấy tất cả
  getAllpage: async (req, res) => {
    const { page_size } = req.body;
    const { page } = req.body;
    const { sort } = req.body;
    const { sortty } = req.body;

    // console.log(page_size+' '+page);
    if (page && page > 0 && page_size != undefined) {
      try {
        var skipPost = (parseInt(page) - 1) * parseInt(page_size);

        const dataPostAll = await DependentPersonModel.find().count();
        const dataPost = await DependentPersonModel.find()
          .skip(skipPost)
          .limit(page_size)
          .sort({ [sort]: sortty });

        if (!dataPost) {
          return res
            .status(400)
            .json({ success: false, message: "There are no posts yet" });
        }

        return res.status(200).json({
          success: true,
          dataPost: dataPost,
          totalPage: Math.ceil(dataPostAll / page_size),
        });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: vi.message_error });
      }
    } else if (page && page > 0 && page_size == undefined) {
      try {
        var skipPost = (parseInt(page) - 1) * parseInt(20);

        const dataPost = await DependentPersonModel.find()
          .skip(skipPost)
          .limit(10)
          .sort({ [sort]: sortty });

        if (!dataPost) {
          return res
            .status(400)
            .json({ success: false, message: "There are no posts yet" });
        }

        return res.status(200).json({ success: true, dataPost: dataPost });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: vi.message_error });
      }
    } else {
      try {
        const page = 1;
        var skipPost = (page - 1) * 20;

        const dataPost = await DependentPersonModel.find()
          .skip(skipPost)
          .limit(10)
          .sort({ [sort]: sortty });

        if (!dataPost) {
          return res
            .status(400)
            .json({ success: false, message: "There are no posts yet" });
        }

        return res.status(200).json({ success: true, dataPost: dataPost });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: vi.message_error });
      }
    }
  },

  getAllbyIDStaff: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await DependentPersonModel.find({ IDStaff: id });

      return res.status(200).json({ data, success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //lấy id
  getByID: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await DependentPersonModel.findById(id);

      return res.status(200).json({ data, success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //tìm kiếm key
  searchDependentPersonByKey: async (req, res) => {
    const { valueSearch, keySearch, sort, sortty } = req.body;

    try {
      const dataDependentPerson = await DependentPersonModel.find({
        [keySearch]: { $regex: valueSearch, $options: "si" },
      })
        .limit(10)
        .sort({ [sort]: sortty });

      if (dataDependentPerson.length == 0) {
        return res
          .status(400)
          .json({ success: true, message: "Dữ liệu Không tồn tại" });
      }

      return res
        .status(200)
        .json({ success: true, data: dataDependentPerson, totalPage: 1 });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
};

module.exports = DependentPersonControllers;
