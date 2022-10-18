//ngon nu
const vi = require("../language/vi.json");
const en = require("../language/en.json");
const jp = require("../language/japan.json");
const langArray = [en, vi, jp];

//Call models
const StaffModel = require("../models/staffModel");
const countModel = require("../models/countModel");

const staffContronller = {
  //reset đém số mã nhân viên
  resetNumberID: async (req, res) => {
    try {
      const Staff = await StaffModel.find().count();
      //kiểm tra trong table staff còn nhân viên nào không
      if (Staff > 0) {
        return res.status(400).json({
          success: false,
          message: "Không thể đặt mã nhân về mặc định khi nhân viên còn",
        });
      }

      const ad = await countModel.findOneAndUpdate({ CountStaffID: 0 });
      return res
        .status(200)
        .json({ success: true, message: "Mã số nhân viên đã về mặc định" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //Thêm nhân viên mới
  createStaff: async (req, res) => {
    // const langIndex = req.lang
    const {
      //   numberID,
      familyCircumstances,
      typeCardID,
      numberNV,
      sexStaff,
      DateOfBirth,
      maritalStatus,
      ethnic,
      Religion,
      nameStaff,
      IDcard1,
      DateRangeIDcard1,
      IssuedbyIDcard1,
      Nationality,
      phoneNumber,
      phoneNumber1,
      email,
      addressResident,
      addressstaying,
      Company,
      companyBranch,
      department,
      group,
      titleStaff,
      // jobPosition,
      vacationDay,
      vacationDayUse,
      DateStartTestWork,
      DateStartWork,
      RetirementDay,
      Working,
      TaxCode,
      CodeBHXH,
      BankNameAccount,
      BankNameUserAccount,
      BankNumberAccount,
      BasicSalary,
      PaymentRateBHXH,
      RisingDayBHXH,
      ReducedDayBHXH,
      AcademicLevel,
      Classification,
      TrainingPlaces,
      SpecializedTraining,
      UrlAccount,
      statusWorking,
      //
      NameCompany,
      NamecompanyBranch,
      Namedepartment,
      Namegroup,
      ExcerptBHXH,
    } = req.body;

    if (!numberNV) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập mã nhân viên" });
    }

    if (!nameStaff) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên nhân viên" });
    }

    if (!IDcard1) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập CCCD/CMND" });
    }

    if (IDcard1.length < 9) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập CCCD/CMND ít nhất 9 số",
      });
    }

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập số điện thoại" });
    }

    if (!sexStaff) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn giới tính" });
    }

    if (!Company) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn công ty" });
    }

    if (!companyBranch) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn chi nhánh" });
    }

    if (!Working) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn trạng thái" });
    }

    if (!statusWorking) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn loại hợp đồng" });
    }

    try {
      //kiêm tra có bị trùng IDcard
      const Staff = await StaffModel.find({ IDcard1: IDcard1 }).count();
      if (Staff > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Số CCCD/CMND đã tồn tại" });
      }

      const Staff01 = await StaffModel.find({ numberNV: numberNV }).count();
      if (Staff01 > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Mã nhân viên tồn tại" });
      }

      //
      const dataCount = await countModel.findOne();
      const numberID = dataCount.CountStaffID + 1;

      const newStaff = await new StaffModel({
        familyCircumstances,
        typeCardID,
        numberID,
        numberNV,
        sexStaff,
        DateOfBirth,
        maritalStatus,
        ethnic,
        Religion,
        nameStaff,
        IDcard1,
        DateRangeIDcard1,
        IssuedbyIDcard1,
        Nationality,
        phoneNumber,
        phoneNumber1,
        email,
        addressResident,
        addressstaying,
        Company,
        companyBranch,
        department,
        group,
        titleStaff,
        // jobPosition,
        vacationDay,
        vacationDayUse,
        DateStartTestWork,
        DateStartWork,
        RetirementDay,
        Working,
        TaxCode,
        CodeBHXH,
        BankNameAccount,
        BankNameUserAccount,
        BankNumberAccount,
        BasicSalary,
        PaymentRateBHXH,
        RisingDayBHXH,
        ReducedDayBHXH,
        AcademicLevel,
        Classification,
        TrainingPlaces,
        SpecializedTraining,
        UrlAccount,
        statusWorking,
        //
        NameCompany,
        NamecompanyBranch,
        Namedepartment,
        Namegroup,
        ExcerptBHXH: 0.1 * PaymentRateBHXH,
      });

      await newStaff.save();
      await countModel.findOneAndUpdate({}, { CountStaffID: numberID });

      return res
        .status(200)
        .json({ success: true, message: "Thêm nhân viên mới thành công" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //cập nhật lại nhân viên
  updataStaff: async (req, res) => {
    const {
      familyCircumstances,
      typeCardID,
      numberNV,
      sexStaff,
      DateOfBirth,
      maritalStatus,
      ethnic,
      Religion,
      nameStaff,
      IDcard1,
      DateRangeIDcard1,
      IssuedbyIDcard1,
      Nationality,
      phoneNumber,
      phoneNumber1,
      email,
      addressResident,
      addressstaying,
      Company,
      companyBranch,
      department,
      group,
      titleStaff,
      // jobPosition,
      vacationDay,
      vacationDayUse,
      DateStartTestWork,
      DateStartWork,
      RetirementDay,
      Working,
      TaxCode,
      CodeBHXH,
      BankNameAccount,
      BankNameUserAccount,
      BankNumberAccount,
      BasicSalary,
      PaymentRateBHXH,
      RisingDayBHXH,
      ReducedDayBHXH,
      AcademicLevel,
      Classification,
      TrainingPlaces,
      SpecializedTraining,
      UrlAccount,
      statusWorking,
      //
      NameCompany,
      NamecompanyBranch,
      Namedepartment,
      Namegroup,
      ExcerptBHXH,
    } = req.body;
    const id = req.params.id;

    if (!numberNV) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập mã nhân viên" });
    }

    if (!nameStaff) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên nhân viên" });
    }

    if (!IDcard1) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập CCCD/CMND" });
    }

    if (IDcard1.length < 9) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập CCCD/CMND ít nhất 9 số",
      });
    }

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập số điện thoại" });
    }

    if (!sexStaff) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn giới tính" });
    }

    if (!Company) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn công ty" });
    }

    if (!companyBranch) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn chi nhánh" });
    }

    if (!Working) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn trạng thái" });
    }

    if (!statusWorking) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn loại hợp đồng" });
    }

    try {
      //kiêm tra có bị trùng IDcard
      const Staff = await StaffModel.find({ IDcard1: IDcard1 }).count();

      if (Staff > 1) {
        return res
          .status(400)
          .json({ success: false, message: "Số CCCD/CMND đã tồn tại" });
      }

      const Staff01 = await StaffModel.find({ numberNV: numberNV }).count();
      if (Staff01 > 1) {
        return res
          .status(400)
          .json({ success: false, message: "Mã nhân viên tồn tại" });
      }

      await StaffModel.findByIdAndUpdate(
        { _id: id },
        {
          familyCircumstances,
          typeCardID,
          numberNV,
          sexStaff,
          DateOfBirth,
          maritalStatus,
          ethnic,
          Religion,
          nameStaff,
          IDcard1,
          DateRangeIDcard1,
          IssuedbyIDcard1,
          Nationality,
          phoneNumber,
          phoneNumber1,
          email,
          addressResident,
          addressstaying,
          Company,
          companyBranch,
          department,
          group,
          titleStaff,
          // jobPosition,
          vacationDay,
          vacationDayUse,
          DateStartTestWork,
          DateStartWork,
          RetirementDay,
          Working,
          TaxCode,
          CodeBHXH,
          BankNameAccount,
          BankNameUserAccount,
          BankNumberAccount,
          BasicSalary,
          PaymentRateBHXH,
          RisingDayBHXH,
          ReducedDayBHXH,
          AcademicLevel,
          Classification,
          TrainingPlaces,
          SpecializedTraining,
          UrlAccount,
          statusWorking,
          //
          NameCompany,
          NamecompanyBranch,
          Namedepartment,
          Namegroup,
          ExcerptBHXH: 0.1 * PaymentRateBHXH,
        }
      );

      return res
        .status(200)
        .json({ success: true, message: "Cập nhật nhân viên mới thành công" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //xóa nhân viên
  delStaff: async (req, res) => {
    const id = req.params.id;
    try {
      const staff = await StaffModel.findByIdAndDelete({ _id: id });

      if (!staff) {
        return res
          .status(400)
          .json({ success: false, message: "Nhân viên không tồn tại" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Xóa thành công " + staff.nameStaff });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //lấy tất cả nhân viên
  getAllStaff: async (req, res) => {
    const { page_size } = req.body;
    const { page } = req.body;
    const { sort } = req.body;
    const { sortty } = req.body;

    // console.log(page_size+' '+page);
    if (page && page > 0 && page_size != undefined) {
      try {
        var skipPost = (parseInt(page) - 1) * parseInt(page_size);

        const dataPostAll = await StaffModel.find().count();
        const dataPost = await StaffModel.find()
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

        const dataPost = await StaffModel.find()
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

        const dataPost = await StaffModel.find()
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

  //laays all nhan vien xuat EX
  getAllSEX: async (req, res) => {
    try {
      const data = await StaffModel.find();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //laays all nhan vien xuat EX so
  getAllSEXNumber: async (req, res) => {
    try {
      const data = await StaffModel.find().count();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //lấy thông tin chi tiết nhân viên
  getStaff: async (req, res) => {
    const id = req.params.id;

    try {
      const dataStaff = await StaffModel.findById({ _id: id });

      if (!dataStaff) {
        return res
          .status(200)
          .json({ success: true, message: "Nhân viên không tồn tại" });
      }

      return res.status(200).json({ success: true, data: dataStaff });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //lấy thông tin nhân viên cho người phụ thuộc
  getStaffNPT: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await StaffModel.findById(
        { _id: id },
        {
          numberNV: 1,
          nameStaff: 1,
        }
      );

      return res.status(200).json({ success: true, data });
    } catch (error) {
      // console.log(error);
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //Tim kiếm
  searchStaff: async (req, res) => {
    const { keySearch, valueSearch } = req.body;

    try {
      const dataStaff = await StaffModel.find({ [keySearch]: valueSearch });

      if (dataStaff.length == 0) {
        return res
          .status(400)
          .json({ success: true, message: "Dữ liệu Không tồn tại" });
      }

      return res.status(200).json({ success: true, data: dataStaff });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //tìm kiếm theo tên
  searchStaffByName: async (req, res) => {
    const { valueSearch, keySearch, sort, sortty } = req.body;

    try {
      if (keySearch === "numberID") {
        const dataStaff = await StaffModel.find({
          numberID: valueSearch,
        })
          .limit(10)
          .sort({ [sort]: sortty });

        return res
          .status(200)
          .json({ success: true, data: dataStaff, totalPage: 1 });
      }
      const dataStaff = await StaffModel.find({
        [keySearch]: { $regex: valueSearch, $options: "si" },
      })
        .limit(10)
        .sort({ [sort]: sortty });

      if (dataStaff.length == 0) {
        return res
          .status(400)
          .json({ success: true, message: "Dữ liệu Không tồn tại" });
      }

      return res
        .status(200)
        .json({ success: true, data: dataStaff, totalPage: 1 });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  filter: async (req, res) => {
    const { group, department, companyBranch, statusWorking, Working } =
      req.body;

    if (!group || !department || !companyBranch || !statusWorking || !Working) {
      return res
        .status(400)
        .json({ success: false, message: "vui lòng nhập đủ dữ liệu" });
    }

    try {
      if (
        group === "All" &&
        department === "All" &&
        companyBranch === "All" &&
        statusWorking === "All" &&
        Working === "All"
      ) {
        const data = await StaffModel.find({});

        return res.status(200).json({ success: true, data });
      } else {
        var keys = [
          "group",
          "department",
          "companyBranch",
          "statusWorking",
          "Working",
        ];
        let values = [group, department, companyBranch, statusWorking, Working];
        var map = new Map();
        var arrayF = [];
        //
        for (var i = 0; i < keys.length; i++) {
          map.set(keys[i], values[i]);
        }
        //
        // Printing
        for (var key of map.keys()) {
          if (map.get(key) !== "All") {
            arrayF.push(key);
            console.log(key);
          }
        }

        const data = await StaffModel.find({ companyBranch, department });

        return res.status(200).json({ success: true, data });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //xuất ra file EX tùy chỉnh 01
  EXcustom1: async (req, res) => {
    try {
      const data = await StaffModel.find(
        {},
        {
          _id: 0,
          numberNV: 1,
          nameStaff: 1,
          Company: 1,
          companyBranch: 1,
          department: 1,
          group: 1,
          BasicSalary: 1,
          Working: 1,
          PaymentRateBHXH: 1,
          ExcerptBHXH: 1,
          BankNumberAccount: 1,
          BankNameUserAccount: 1,
          BankNameAccount: 1,
          familyCircumstances: 1,
        }
      );

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //cộng số người phụ thuộc cho nhân viên
  SumDependent: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await StaffModel.findById(
        { _id: id },
        { familyCircumstances: 1, _id: 0 }
      );

      await StaffModel.findByIdAndUpdate(
        { _id: id },
        { familyCircumstances: data.familyCircumstances + 1 }
      );

      return res
        .status(200)
        .json({ success: true, message: "Cập nhật thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //update số người phụ thuộc cho nhân viên
  updateSumDependent: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await StaffModel.findById(
        { _id: id },
        { familyCircumstances: 1, _id: 0 }
      );

      await StaffModel.findByIdAndUpdate(
        { _id: id },
        { familyCircumstances: data.familyCircumstances - 1 }
      );

      return res
        .status(200)
        .json({ success: true, message: "Cập nhật thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
  //lấy tất cả người trong nhóm
  getGroupStaff: async (req, res) => {
    const { Company, companyBranch, department, group } = req.body;

    if(!Company){
      return res.status(401).json({message:'Vui lòng chọn công ty'})
    }
    if(!companyBranch){
      return res.status(401).json({message:'Vui lòng chọn chi nhánh'})
    }
    if(!department){
      return res.status(401).json({message:'Vui lòng chọn phòng ban'})
    }
    if(!group){
      return res.status(401).json({message:'Vui lòng chọn nhóm'})
    }
    
    try {
      const data = await StaffModel.find({
        Company,
        companyBranch,
        department,
        group,
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },
};

module.exports = staffContronller;
