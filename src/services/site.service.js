const {SiteData} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createSiteData = async(body) =>{
    try{
        data = await SiteData.create(body);
    }catch(err){          
    }
    return data;
}

module.exports = {
    createSiteData
}