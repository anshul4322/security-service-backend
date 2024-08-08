const { date } = require("joi");
const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
    {
      empId: {
        type: String
      },
      empName: {
        type: String,  
      },
      siteId: {
        type: String,
        required: true
      },
      siteName: {
        type: String,
      },
      attendanceDate: {
        type: String,
        required: true,
      },
      dayReport: {
        type: String
    },
  },
  {
      timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports.Attendance = Attendance;

module.exports = {
    Attendance,
};