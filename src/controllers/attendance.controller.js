const attendanceService = require("../services/attendance.service");
const httpStatus = require("http-status");
const ApiError = require('../utils/ApiError');

const getData = (async(req,res, next) => {
    try {
        let data = await attendanceService.getAttendanceData(req, res);
        res.send(data);
    } catch (error) {
        next(error);
    }
})

const deleteData = async (req, res, next) => {
    try {
        await attendanceService.deleteAttendance(req, res, next);
        
        if (!res.headersSent) {
            return res.status(httpStatus.NO_CONTENT).send();
        }
    } catch (error) {
        next(error);
    }
};

const updateAttendance = async (req, res, next) => {
    try{
        const attendance = await attendanceService.createUpdateAttendance(
            req.body
        );
        return res.status(httpStatus.OK).send(attendance);
    } catch(error) {
        next(error);
    }
    
};

module.exports = {
    getData,
    deleteData,
    updateAttendance
};