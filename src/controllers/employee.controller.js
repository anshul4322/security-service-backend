const employeeService = require("../services/employee.service");
const httpStatus = require("http-status");

const saveEmployeeData = async(req,res) => {
    const data = await employeeService.createEmployeeData(req.body);
    res.status(httpStatus.CREATED).send({data})
}

const getData = (async(req,res) => {
    let data;
    data = await employeeService.getEmployeeData(req.body);
    if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
    }
    else{
        res.send(data);
    }
})

module.exports = {
    saveEmployeeData,
    getData
};