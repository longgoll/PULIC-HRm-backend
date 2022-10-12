//Model
const CompanyModel = require("../models/CompanyModel");
const companyBranchModel = require("../models/companyBranchModel");
const companyDepartmentModel = require("../models/companyDepartmentModel");
const companyGroupModel = require("../models/companyGroupModel");
const staffModel = require("../models/staffModel");
const StaffModule = require("../models/staffModel");

const companyControllers = {
  //đoc tất cả cty
  getAllCompany: async (req, res) => {
    try {
      const data = await CompanyModel.find();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //đọc tên cty
  getCompany: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await CompanyModel.findById({ _id: id });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //Tạo cty
  createCompany: async (req, res) => {
    const { nameCompany } = req.body;

    if (!nameCompany) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên công ty" });
    }

    if (nameCompany.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập tên công ty dưới 50 ký tự",
      });
    }

    try {
      //kiểm tra tên chi nhánh có tồn tại
      const dataCompany = await CompanyModel.findOne({
        Company: nameCompany,
      }).count();

      if (dataCompany > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Tên chi nhánh đã tồn tại" });
      }

      //tạo
      const data = await new CompanyModel({
        Company: nameCompany,
      });

      await data.save();

      return res
        .status(200)
        .json({ success: true, message: "Tạo công ty thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //updata cty
  updataCompany: async (req, res) => {
    const id = req.params.id;
    const { nameCompany, oldCompany } = req.body;

    if (!nameCompany) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên công ty mới" });
    }

    if (!oldCompany) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên công ty cũ" });
    }

    try {
      //all ok
      await CompanyModel.findByIdAndUpdate(
        { _id: id },
        { Company: nameCompany }
      );
      //cập nhật lại chi nhánh của nhân viên
      await staffModel
        .find({ Company: oldCompany })
        .updateMany({ Company: nameCompany });
      //câp nhat lại chi nhánh
      await companyBranchModel
        .find({ ChiCompany: oldCompany })
        .updateMany({ ChiCompany: nameCompany });
      //cập nhật lại phòng ban
      await companyDepartmentModel
        .find({ ChiCompany: oldCompany })
        .updateMany({ ChiCompany: nameCompany });
      //cập nhật lại nhóm
      await companyGroupModel
        .find({ ChiCompany: oldCompany })
        .updateMany({ ChiCompany: nameCompany });


      return res
        .status(200)
        .json({ success: true, message: "Cập nhật công ty thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //xóa cty
  delCompany: async (req, res) => {
    const id = req.params.id;

    try {
      //kiểm tra xem có nhân viên nào không

      //
      const dataCompany = await CompanyModel.find().count();

      if (dataCompany > 1) {
        return res
          .status(400)
          .json({ success: false, message: "phải có ít nhất một cty" });
      }

      await CompanyModel.findByIdAndDelete({ _id: id });

      return res
        .status(200)
        .json({ success: true, message: "Xóa công ty thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //=========
  //đoc tất cả chi nhánh
  getAllBranch: async (req, res) => {
    try {
      const data = await companyBranchModel.find();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //đọc tên chi nhanh
  getBranch: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await companyBranchModel.findById({ _id: id });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //đọc chi nhánh theo cty
  getBranchByChir: async (req, res) => {
    const { ChiCompany } = req.body;

    if (!ChiCompany) {
      return res.status(401).json({ message: "vui lòng thêm ID công ty" });
    }

    try {
      const data = await companyBranchModel.find({ ChiCompany });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //tạo Chi nhánh
  createBranch: async (req, res) => {
    const { nameBranch, ChiCompany } = req.body;

    if (!ChiCompany) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn tên Cty" });
    }

    if (!nameBranch) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên chi nhánh" });
    }

    if (nameBranch.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập tên chi nhánh dưới 50 ký tự",
      });
    }

    try {
      //kiểm tra tên chi nhánh có tồn tại
      const dataBranch = await companyBranchModel
        .findOne({ companyBranch: nameBranch })
        .count();

      if (dataBranch > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Tên chi nhánh đã tồn tại" });
      }

      //tạo
      const data = await new companyBranchModel({
        companyBranch: nameBranch,
        ChiCompany,
      });
      await data.save();

      return res
        .status(200)
        .json({ success: true, message: "Tạo chi nhánh thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //updata Chi nhánh
  updateBranch: async (req, res) => {
    const id = req.params.id;
    const { nameBranch, oldBranch } = req.body;

    if (!nameBranch) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên chi nhánh mới" });
    }

    if (!oldBranch) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên chi nhánh cũ" });
    }

    try {
      //cập nhật chi nhánh
      await companyBranchModel.findByIdAndUpdate(
        { _id: id },
        { companyBranch: nameBranch }
      );
      //cập nhật lại phòng ban
      await companyDepartmentModel
        .find({ ChiCompanyBranch: oldBranch })
        .updateMany({ ChiCompanyBranch: nameBranch });
      //cập nhật lại nhóm
      await companyGroupModel
        .find({ ChiCompanyBranch: oldBranch })
        .updateMany({ ChiCompanyBranch: nameBranch });
      //cập nhật lại chi nhánh của nhân viên
      await staffModel
        .find({ companyBranch: oldBranch })
        .updateMany({ companyBranch: nameBranch });
      //all ok
      return res
        .status(200)
        .json({ success: true, message: "Cập nhật chi nhánh thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //xóa Chi nhánh
  deleteBranch: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await companyBranchModel.findById({ _id: id });
      if (!data) {
        return res
          .status(400)
          .json({ success: true, message: "Không tồn tại chi nhánh" });
      }
      //kiểm tra có nhân viên trong chi nhánh này không
      const dataStaff = await staffModel
        .find({ companyBranch: data.companyBranch })
        .count();
      if (dataStaff > 0) {
        return res.status(400).json({
          success: true,
          message: "Chi nhánh vẩn còn nhân viên không thể xóa",
        });
      }
      //all ok
      await data.delete();

      return res
        .status(200)
        .json({ success: true, message: "Xóa chi nhánh thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //=========
  //đoc tất cả phòng ban
  getAllDepartment: async (req, res) => {
    try {
      const data = await companyDepartmentModel.find();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //đọc tên phòng ban
  getDepartment: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await companyDepartmentModel.findById({ _id: id });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //lấy phòng ban theo cty và chi nhánh
  getDepartmentByChir: async (req, res) => {
    const { ChiCompany, ChiCompanyBranch } = req.body;

    if (!ChiCompany) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn công ty" });
    }

    if (!ChiCompanyBranch) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn chi nhánh" });
    }

    try {
      const data = await companyDepartmentModel.find({
        ChiCompany,
        ChiCompanyBranch,
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //lấy phòng ban theo mõi chi nhánh
  getDepartmentOnly: async (req, res) => {
    const { ChiCompanyBranch } = req.body;

    if (!ChiCompanyBranch) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn chi nhánh" });
    }

    try {
      const data = await companyDepartmentModel.find({
        ChiCompanyBranch,
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //tạo phòng ban
  createDepartment: async (req, res) => {
    const { nameDepartment, ChiCompany, ChiCompanyBranch } = req.body;

    if (!ChiCompany) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn công ty" });
    }

    if (!ChiCompanyBranch) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn chi nhánh" });
    }

    if (!nameDepartment) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên phòng ban" });
    }

    if (nameDepartment.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập tên phòng ban dưới 50 ký tự",
      });
    }

    try {
      //kiểm tra tên phòng ban có tồn tại
      const dataDepartment = await companyDepartmentModel
        .findOne({ department: nameDepartment })
        .count();

      if (dataDepartment > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Tên phòng ban đã tồn tại" });
      }

      //tạo
      const data = await new companyDepartmentModel({
        department: nameDepartment,
        ChiCompany,
        ChiCompanyBranch,
      });
      await data.save();

      return res
        .status(200)
        .json({ success: true, message: "Tạo phòng ban thành công" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //updata phòng ban
  updateDepartment: async (req, res) => {
    const id = req.params.id;
    const { nameDepartment, oldDepartment } = req.body;

    if (!nameDepartment) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên phòng ban mới" });
    }

    if (!oldDepartment) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên phòng ban cũ" });
    }

    try {
      //cập nhật phòng ban
      await companyDepartmentModel.findByIdAndUpdate(
        { _id: id },
        { department: nameDepartment }
      );
      //cập nhật lại nhóm
      await companyGroupModel
        .find({ ChiDepartment: oldDepartment })
        .updateMany({ ChiDepartment: nameDepartment });
      //cập nhật lại phòng ban của nhân viên
      await staffModel
        .find({ department: oldDepartment })
        .updateMany({ department: nameDepartment });
      //all ok
      return res
        .status(200)
        .json({ success: true, message: "Cập nhật phòng ban thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //xóa phòng ban
  deleteDepartment: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await companyDepartmentModel.findById({ _id: id });
      if (!data) {
        return res
          .status(400)
          .json({ success: true, message: "Không tồn tại phòng ban" });
      }
      //kiểm tra có nhân viên trong phòng ban này không
      const dataStaff = await staffModel
        .find({ department: data.department })
        .count();
      if (dataStaff > 0) {
        return res.status(400).json({
          success: true,
          message: "phòng ban vẩn còn nhân viên không thể xóa",
        });
      }
      //all ok
      await data.delete();

      return res
        .status(200)
        .json({ success: true, message: "Xóa phòng ban thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //=========
  //đoc tất cả phòng ban
  getAllGroup: async (req, res) => {
    try {
      const data = await companyGroupModel.find();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
  //đọc tên nhóm
  getGroup: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await companyGroupModel.findById({ _id: id });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //đọc tên nhóm theo cty chi nhánh phòng ban
  GroupByChi: async (req, res) => {
    const { ChiCompany, ChiCompanyBranch, ChiDepartment } = req.body;

    if (!ChiCompanyBranch) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên phòng ban" });
    }

    if (!ChiCompany) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn công ty" });
    }

    if (!ChiDepartment) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn chi nhánh" });
    }

    try {
      const data = await companyGroupModel.find({
        ChiCompany,
        ChiCompanyBranch,
        ChiDepartment,
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //lấy nhóm theo mõi phòng ban
  getGroupOnly: async (req, res) => {
    const { ChiDepartment } = req.body;

    if (!ChiDepartment) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn chi nhánh" });
    }

    try {
      const data = await companyGroupModel.find({
        ChiDepartment,
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //tọa nhóm
  createGroup: async (req, res) => {
    const { nameGroup, ChiCompany, ChiCompanyBranch, ChiDepartment } = req.body;

    if (!ChiCompany) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn công ty" });
    }

    if (!ChiCompanyBranch) {
      return res
        .status(401)
        .json({ success: false, message: "vui lòng chọn chi nhánh" });
    }
    if (!ChiCompanyBranch) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên phòng ban" });
    }
    if (!nameGroup) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên nhóm" });
    }

    if (nameGroup.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập tên nhóm dưới 50 ký tự",
      });
    }

    try {
      //kiểm tra tên nhóm có tồn tại
      const dataGroup = await companyGroupModel
        .findOne({ group: nameGroup })
        .count();

      if (dataGroup > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Tên nhóm đã tồn tại" });
      }

      //tạo
      const data = await new companyGroupModel({
        group: nameGroup,
        ChiCompany,
        ChiCompanyBranch,
        ChiDepartment,
      });
      await data.save();

      return res
        .status(200)
        .json({ success: true, message: "Tạo nhóm thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //updata nhóm
  updateGroup: async (req, res) => {
    const id = req.params.id;
    const { nameGroup, oldGroup } = req.body;

    if (!nameGroup) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên nhóm mới" });
    }

    if (!oldGroup) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập tên nhóm cũ" });
    }

    try {
      //cập nhật nhóm
      await companyGroupModel.findByIdAndUpdate(
        { _id: id },
        { group: nameGroup }
      );
      //cập nhật lại nhóm của nhân viên
      await staffModel
        .find({ group: oldGroup })
        .updateMany({ group: nameGroup });
      //all ok
      return res
        .status(200)
        .json({ success: true, message: "Cập nhật nhóm thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },

  //xóa nhóm
  deleteGroup: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await companyGroupModel.findById({ _id: id });
      if (!data) {
        return res
          .status(400)
          .json({ success: true, message: "Không tồn tại nhóm" });
      }
      //kiểm tra có nhân viên trong nhóm này không
      const dataStaff = await staffModel.find({ group: data.group }).count();
      if (dataStaff > 0) {
        return res.status(400).json({
          success: true,
          message: "nhóm vẩn còn nhân viên không thể xóa",
        });
      }
      //all ok
      await data.delete();

      return res
        .status(200)
        .json({ success: true, message: "Xóa nhóm thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Vui lòng thử lại sau" });
    }
  },
};

module.exports = companyControllers;
