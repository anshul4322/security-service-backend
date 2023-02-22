const { date } = require("joi");
const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
    {
        site: {
          type: String,
          required: true
        },
        attendenceDate: {
          type: String
        },
        name: {
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
      }
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