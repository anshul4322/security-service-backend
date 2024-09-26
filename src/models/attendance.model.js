const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
  },
  empId: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  attendance: [
    {
      attendanceDate: {
        type: Date,
        required: true,
      },
      dayReport: {
        type: String,
        required: true,
      },
    },
  ],
  totalAttendance: { 
    type: Number, 
    default: 0 
  },
  salary: { 
    type: Number, 
    default: 0
  },
  settled: { 
    type: String, 
    default: 'no'
  }
}, {
  timestamps: true,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports.Attendance = Attendance;
