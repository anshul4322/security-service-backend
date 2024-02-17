const { date } = require("joi");
const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
    {
        siteId: {
          type: String,
          required: true
        },
        siteName: {
          type: String,
        },
        attendanceDate: {
          type: String
        },
        empName: {
          type: String,  
        },
        inTime: {
            type: String
        },
        outTime: {
            type: String
        },
        dayReport: {
          type: String
      },
        empId: {
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