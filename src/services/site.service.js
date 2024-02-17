const {SiteData} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createSiteData = async(body) =>{
    try{
        data = await SiteData.create(body.siteDetail);
    }catch(err){   
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,  
        )     
    }
    return data;
}

const getSiteData = (body => {
    return SiteData.find();
})

module.exports = {
    createSiteData,
    getSiteData
}