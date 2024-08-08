const {EmployeeData} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createEmployeeData = async (employee) => {
    const empId = "SE" + Math.random().toString().substr(2, 6);
    try {
      // Validate payload
      if (!employee.aadharNo) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Aadhar Number is required.");
      }
      if (!empId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Employee ID is required.");
      }
      if (!employee.phone || isNaN(employee.phone)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Valid Phone Number is required.");
      }
      // Add more validation checks as needed...
  
      if (await EmployeeData.isAadharMatch(employee.aadharNo)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Employee already registered with this Aadhar card.");
      }
      if (await EmployeeData.isEmployeeIdMatch(employee.empId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Employee already registered with this Employee ID.");
      }
  
      // Generate employee ID and save data
      const data = await EmployeeData.create({ ...employee, empId:empId });
      return data;
    } catch (err) {
      // Log detailed error information
      console.error("Error creating employee data:", err.message, err.stack);
  
      if (err instanceof ApiError) {
        throw err; // Re-throw known API errors
      } else {
        // Handle unexpected errors
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error. Please try again later.");
      }
    }
  };
  

const getEmployeeData = (body) => {
    return EmployeeData.find();
}

module.exports = {
    createEmployeeData,
    getEmployeeData
}