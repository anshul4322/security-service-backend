const {Attendance} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createAttendanceData = async(body) =>{
    try{
        data = await Attendance.insertMany(body.formValues);
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
    let result;
    const promises = body?.formValues.map(async (item) => {
      const { empId, attendanceDate, dayReport, workingSiteId } = item;
      const foundAttendance = await Attendance.findOne({ empId: item.empId, attendanceDate: item.attendanceDate });
      if(!!foundAttendance){
        result = await Attendance.updateOne(
            { empId: empId, attendanceDate: attendanceDate },
            { $set: { dayReport: dayReport, workingSiteId: workingSiteId } }
        );
      }else{
            result = await Attendance.insertMany([item]);
      }
      return result;
    });
  
    // Execute all update operations in parallel
    const updateResults = await Promise.all(promises);
  
    // Check if any documents were updated
    const numModified = updateResults.reduce((total, result) => total + result.nModified, 0);
    if (numModified === 0) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "No attendance records were updated"
      );
    }
  
  return updateResults;
};
  
  

module.exports = {
    createAttendanceData,
    getAttendanceData,
    deleteAttendance,
    updateAttendance
}