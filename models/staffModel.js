// Using Node.js `require()`
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StaffSchema = new Schema(
  {
    //danh sách check lish
    checklist1: {
      type: Boolean,
      default: false
    },
    checklist2: {
      type: Boolean,
      default: false
    },
    checklist3: {
      type: Boolean,
      default: false
    },
    checklist4: {
      type: Boolean,
      default: false
    },
    checklist5: {
      type: Boolean,
      default: false
    },
    checklist6: {
      type: Boolean,
      default: false
    },
    //Số ID
    numberID: {
      type: Number,
      query: true,
    },
    //loại giấy tờ (cmnd, cccd)
    typeCardID: {
      type: String,
      query: true,
    },
    //mã số nhân viên
    numberNV: {
      type: String,
      query: true,
    },
    //Giới tính
    sexStaff: {
      type: String,
      query: true,
    },
    //Ngày sinh
    DateOfBirth: {
      type: Date,
      query: true,
    },
    //Tình trạng hôn nhân
    maritalStatus: {
      type: String,
      query: true,
    },
    //Dân tộc
    ethnic: {
      type: String,
      query: true,
    },
    //Tôn giáo
    Religion: {
      type: String,
      query: true,
    },
    //Họ và tên
    nameStaff: {
      type: String,
      query: true,
    },
    //CCCD
    IDcard1: {
      type: String,
      query: true,
    },
    //Ngày cấp CCCD
    DateRangeIDcard1: {
      type: Date,
      query: true,
    },
    //Nơi cấp CCCD
    IssuedbyIDcard1: {
      type: String,
      query: true,
    },
    //Quốc tịch
    Nationality: {
      type: String,
      query: true,
    },
    //Số ĐT 1
    phoneNumber: {
      type: String,
      query: true,
    },
    //Số ĐT 2
    phoneNumber1: {
      type: String,
      query: true,
    },
    //Email
    email: {
      type: String,
      query: true,
    },
    //địa chỉ thường trú
    // addressResident: {
    //   city: String,
    //   districts: String,
    //   wards: String,
    //   address: String,
    //   domicile: String,
    // },
    // //địa chỉ tạm trú
    // addressstaying: {
    //   city: String,
    //   districts: String,
    //   wards: String,
    //   address: String,
    //   domicile: String,
    // },
    //địa chỉ thường trú
    addressResident: {
      type: String,
      query: true,
    },
    //địa chỉ tạm trú
    addressstaying: {
      type: String,
      query: true,
    },
    //công ty
    Company: {
      type: String,
      query: true,
    },
    NameCompany: {
      type: String,
      query: true,
    },
    //Chi nhanh
    companyBranch: {
      type: String,
      query: true,
    },
    NamecompanyBranch: {
      type: String,
      query: true,
    },
    //phòng ban
    department: {
      type: String,
      query: true,
    },
    Namedepartment: {
      type: String,
      query: true,
    },
    //nhóm
    group: {
      type: String,
      query: true,
    },
    Namegroup: {
      type: String,
      query: true,
    },
    //chức danh
    titleStaff: {
      type: String,
      query: true,
    },
    //vị trí làm
    // jobPosition: {
    //   type: String,
    //   query: true,
    // },
    //ngày nghỉ phép
    vacationDay: {
      type: Number,
      query: true,
    },
    //ngày nghỉ phép đã dùng
    vacationDayUse: {
      type: Number,
      query: true,
    },
    //ngày bắt đầu làm thử
    DateStartTestWork: {
      type: Date,
      query: true,
    },
    //ngày bắt đầu làm chính thức
    DateStartWork: {
      type: Date,
      query: true,
    },
    //Ngày nghỉ làm
    RetirementDay: {
      type: Date,
      query: true,
    },
    //trạng thái
    //có đang làm không
    Working: {
      type: String,
      query: true,
    },
    //loại hợp đồng
    statusWorking: {
      type: String,
      query: true,
    },
    //Thông tin bổ sung
    //Mã số thuế
    TaxCode: {
      type: String,
      query: true,
    },
    //mã số BHXH
    CodeBHXH: {
      type: String,
      query: true,
    },
    //Số người giảm trừ gia cảnh
    familyCircumstances: {
      type: Number,
      query: true,
      default: 0,
    },
    //tên ngân hàng
    BankNameAccount: {
      type: String,
      query: true,
    },
    //Tên TK ngân hàng
    BankNameUserAccount: {
      type: String,
      query: true,
    },
    //số TK ngân hàng
    BankNumberAccount: {
      type: String,
      query: true,
    },
    //Lương cơ bản
    BasicSalary: {
      type: Number,
      query: true,
    },
    //Mức đóng BHXH
    PaymentRateBHXH: {
      type: Number,
      query: true,
    },
    //Trích BHXH
    ExcerptBHXH: {
      type: String,
      query: true,
    },
    //Ngày báo tăng BHXH
    RisingDayBHXH: {
      type: Date,
      query: true,
    },
    //Ngày báo giảm BHXH
    ReducedDayBHXH: {
      type: Date,
      query: true,
    },
    //Trình độ học vấn (Đại học, cao đẳng, trung cấp, THPT, THCS)
    AcademicLevel: {
      type: String,
      query: true,
    },
    //Xếp loại(Xuất sắc, tốt, trung bình)
    Classification: {
      type: String,
      query: true,
    },
    //Nơi đào tạo(trường)
    TrainingPlaces: {
      type: String,
      query: true,
    },
    //Chuyên ngành đào tạo
    SpecializedTraining: {
      type: String,
      query: true,
    },
    //URL ảnh
    UrlAccount: {
      type: String,
      query: true,
    },
    //
  },
  { timestamps: true }
);
//
const StaffModule = mongoose.model("Staff", StaffSchema);
module.exports = StaffModule;
