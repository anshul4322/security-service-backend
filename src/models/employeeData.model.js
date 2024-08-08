const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
      unique: true
    },
    siteId: {
      type: String,
      required: true,
    },
    siteName: {
      type: String,
      required: true,
    },
    empName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      // enum: ["male", "female", "other"]
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String
    },
    birthDate: {
      type: Date
    },
    designation: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
    },
    joiningDate: {
      type: Date
    },
    uan: {
      type: String
    },
    esic: {
      type: String
    },
    policeVer: {
      type: Boolean
    },
    medicalVer: {
      type: Boolean
    },
    iCard: {
      type: Boolean
    },
    aadharNo: {
      type: String
    },
    panNo: {
      type: String
    },
    photo: {
      type: String
    },
    bankAcc: {
      type: String
    },
    bankIFSC: {
      type: String
    },
    nomineeDetails: {
      type: String
    },
    companyForm: {
      type: Boolean
    },
    registrationFees: {
      type: Number
    },
    isActive: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

employeeSchema.statics.isAadharMatch = async function (aadharNo) {
    const site = await this.findOne({ aadharNo });
    return !!site;
};
employeeSchema.statics.isEmployeeIdMatch = async function (empId) {
    const site = await this.findOne({ empId });
    return !!site;
  };

employeeSchema.pre("save", async function (next) {
    const user = this;
    next();
});

const EmployeeData = mongoose.model("EmployeeData", employeeSchema);

module.exports.EmployeeData = EmployeeData;

module.exports = {
    EmployeeData,
};