const attendanceService = require("../services/attendance.service");
const httpStatus = require("http-status");

const saveData = (async(req,res) => {
    let data;
    data = await attendanceService.createAttendanceData(req.body);
    res.status(httpStatus.CREATED).send({data})
})

const getData = (async(req,res) => {
    let data;
    data = await attendanceService.getAttendanceData(req.body);
    if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
    }
    else{
        res.send(data);
    }
})

const deleteData = (async(req,res) => {
    attendanceService.deleteAttendance(req.query._id);
    return res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
    saveData,
    getData,
    deleteData
};