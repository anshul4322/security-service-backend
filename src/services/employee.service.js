const {EmployeeData} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createEmployeeData = async(employee) =>{
    if(await EmployeeData.isAadharMatch(employee.aadharNo)){
        throw new ApiError(httpStatus.OK, "Employee Already Registered with this aadhar card");
    }
    if(await EmployeeData.isEmployeeIdMatch(employee.empId)){
        throw new ApiError(httpStatus.OK, "Employee Already Registered with this Employee Id");
    }
    var empId = "SE"+Math.random().toString().substr(2, 6)
    try{
        data = await EmployeeData.create({...employee, empId: empId})
    }catch(err){   
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
        )     
    }
    return data;
}

const getEmployeeData = (body) => {
    return EmployeeData.find();
}

module.exports = {
    createEmployeeData,
    getEmployeeData
}