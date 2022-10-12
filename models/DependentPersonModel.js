// Using Node.js `require()`
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DependentPersonSchema = new Schema(
  {
    //ID nhân viên
    IDStaff: {
      type: String,
      query: true,
    },
    //mã số nhân viên
    numberNV: {
      type: String,
      query: true,
    },
    //Họ và tên NV
    nameStaff: {
      type: String,
      query: true,
    },
    //Họ và tên Người phụ thuộc
    nameDependentPerson: {
      type: String,
      query: true,
    },
    //ngày sinh NPT
    DateOfBirthDependentPerson: {
      type: Date,
      query: true,
    },
    //Mã số thuế người phụ thuộc
    TaxCodeDependentPerson: {
      type: String,
      query: true,
    },
    //loại giấy tờ (cmnd, cccd) NPT
    typeCardIDDependentPerson: {
      type: String,
      query: true,
    },
    //CCCD NPT
    IDcard1DependentPerson: {
      type: String,
      query: true,
    },
    //Ngày cấp CCCD NPT
    DateRangeIDcard1DependentPerson: {
      type: Date,
      query: true,
    },
    //Nơi cấp CCCD NPT
    IssuedbyIDcard1DependentPerson: {
      type: String,
      query: true,
    },
    //số giấy tờ
    numberOfPapers: {
      type: String,
      query: true,
    },
    //Quan hệ với người nộp
    RelationshipWithTaxpayers: {
      type: String,
      query: true,
    },
    //từ tháng
    FromMonth: {
      type: Date,
      query: true,
    },
    //tới tháng
    ToTheMonth: {
      type: Date,
      query: true,
    },
  },
  { timestamps: true }
);
//
const DependentPersonModule = mongoose.model(
  "DependentPerson",
  DependentPersonSchema
);
module.exports = DependentPersonModule;
