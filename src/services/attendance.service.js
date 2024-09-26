const {Attendance} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

async function createUpdateAttendance(payload) {
  for (const record of payload) {
    const { siteId, attendanceDate, empId, dayReport } = record;
  
    const month = attendanceDate.slice(0, 7);
  
    let attendanceRecord = await Attendance.findOne({ siteId, empId, month });

    const attendancePoints = {A: 0, D: 2, P: 1, PL: 1, H: 0.5};

    if (attendanceRecord) {
        const attendanceIndex = attendanceRecord.attendance.findIndex(
            (entry) => entry.attendanceDate.toISOString().slice(0, 10) === attendanceDate
        );
        if (attendanceIndex !== -1) {
            attendanceRecord.attendance[attendanceIndex].dayReport = dayReport;
        } else {
            attendanceRecord.attendance.push({ attendanceDate, dayReport });
        }
    } else {
        attendanceRecord = new Attendance({siteId, empId, month, attendance: [{ attendanceDate, dayReport }], totalAttendance: 0 });
    }

    attendanceRecord.totalAttendance = attendanceRecord.attendance.reduce((total, entry) => {
        return total + (attendancePoints[entry.dayReport] || 0);
    }, 0);
    await attendanceRecord.save();
  }
}

const getAttendanceData = async (req, res) => {
  try {
      const { siteId, empId, month } = req.query;
      if (!month || (!siteId && !empId)) {
          throw new ApiError(400, 'Please provide a valid month and either siteId or empId.');
      }

      const query = { month };

      if (siteId) {
          query.siteId = siteId;
      }
      if (empId) {
          query.empId = empId;
      }

      const attendanceRecords = await Attendance.find(query);

      if (!attendanceRecords || attendanceRecords.length === 0) {
        return [];
      }

      return attendanceRecords;
  } catch (error) {
      throw new ApiError(500, 'An error occurred while fetching attendance records.');
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const { siteId, empId, attendanceDate } = req.body;
    if (!siteId || !empId || !attendanceDate) {
        return res.status(400).json({ message: 'Please provide valid siteId, empId, and attendanceDate.' });
    }
    const month = attendanceDate.slice(0, 7);

    let attendanceRecord = await Attendance.findOne({ siteId, empId, month });

    if (!attendanceRecord) {
        return res.status(404).json({ message: 'Attendance record not found.' });
    }

    const attendanceIndex = attendanceRecord.attendance.findIndex(
        (entry) => entry.attendanceDate.toISOString().slice(0, 10) === attendanceDate
    );

    if (attendanceIndex === -1) {
        return res.status(404).json({ message: 'Attendance entry for the given date not found.' });
    }

    attendanceRecord.attendance.splice(attendanceIndex, 1);

    if (attendanceRecord.attendance.length === 0) {
        await Attendance.deleteOne({ siteId, empId, month });
        return res.status(200).json({ message: 'Attendance record deleted successfully.' });
    }

    const attendancePoints = {A: 0, D: 2, P: 1, PL: 1, H: 0.5};

    attendanceRecord.totalAttendance = attendanceRecord.attendance.reduce((total, entry) => {
        return total + (attendancePoints[entry.dayReport] || 0);
    }, 0);

    await attendanceRecord.save();
    return res.status(200).json({ message: 'Attendance entry deleted successfully.' });

  } catch (error) {
      next(error);
  }
};

module.exports = {
    createUpdateAttendance,
    getAttendanceData,
    deleteAttendance,
}