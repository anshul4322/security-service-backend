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

const updateEmployeeData = async (req, res, next) => {
    const { empId } = req.params;
    const updatedData = req.body;
    try {
        const updatedEmployee = await employeeService.updateEmployee(empId, updatedData);
        res.status(httpStatus.OK).json(updatedEmployee);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    saveEmployeeData,
    updateEmployeeData,
    getData
};