const {GuardData} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createGuardData = async(body) =>{
    let data = await GuardData.findOne({phone:body.guardData.phone});
    if(data){
        try{
            data = await GuardData.create(body);
        }catch(err){
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Mobile no. already exists"
            );          
        }
    }
    return data;
}

module.exports = {
    createGuardData
}