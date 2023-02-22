const {Attendance} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createAttendanceData = async(body) =>{
    console.log(body,"body")
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

const deleteAttendance = async(id) => {
    let data = await Attendance.deleteOne({_id: id })
    return data;
}

module.exports = {
    createAttendanceData,
    getAttendanceData,
    deleteAttendance
}