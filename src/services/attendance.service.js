const {Attendance} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createAttendanceData = async(att) =>{
    try{
        data = await Attendance.insertMany(att);
    }catch(err){
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
        );          
    }   
    return data;
  }

const getAttendanceData = (body => {
    return Attendance.find();
})

const deleteAttendance = async(body) => {
  try {
    let data = await Attendance.deleteOne({ empId: body.empId, attendanceDate: body.attendanceDate });
    return data;
  } catch (error) {
    console.error('Error deleting attendance:', error);
    throw error;
  }
}

const updateAttendance = async (body) => {
    const promises = body?.formValues.map(async (item) => {
      const { empId, attendanceDate, dayReport, siteId } = item;
      const foundAttendance = await Attendance.findOne({ empId, attendanceDate, siteId });
      let result;

      if (foundAttendance) {
        result = await Attendance.updateOne(
          { empId, attendanceDate, siteId },
          { $set: { dayReport } }
        );
      } else {
        result = await Attendance.insertMany([item]);
      }

      return result;
    });

    // Execute all update operations in parallel
    await Promise.all(promises);

    // Fetch the updated attendance data for the given site and date
    const updatedAttendanceData = await Attendance.find({
      siteId: body.formValues[0].siteId,
      attendanceDate: body.formValues[0].attendanceDate,
    });

    return updatedAttendanceData;
};

module.exports = {
    createAttendanceData,
    getAttendanceData,
    deleteAttendance,
    updateAttendance
}