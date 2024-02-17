const {EmployeeData} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createEmployeeData = async(body) =>{
    let data
    // if(data){
        try{
            data = await EmployeeData.create(body.employeeData);
        }catch(err){
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Mobile no. already exists"
            );          
        }
        return data;
    }
    
// }

const getEmployeeData = (body => {
    return EmployeeData.find();
})

module.exports = {
    createEmployeeData,
    getEmployeeData
}