const {SiteData} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createSiteData = async(site) =>{
    if(await SiteData.isSiteRegistered(site.siteName, site.companyId)){
        throw new ApiError(httpStatus.OK, "Site Already Registered");
    }
    var siteId = "SA"+Math.random().toString().substr(2, 4)
    try{
        data = await SiteData.create({...site, siteId: siteId});
    }catch(err){   
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
        )     
    }
    return data;
}

const getSiteData = async (companyId) => {
    return SiteData.find({ companyId });
}

const updateSiteData = async (siteId, updates) => {
    try {
        const updatedSite = await SiteData.findOneAndUpdate(
            { siteId },
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!updatedSite) {
            throw new ApiError(httpStatus.NOT_FOUND, "Site not found");
        }
        return updatedSite;
    } catch (err) {
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Error updating site data"
        );
    }
};

module.exports = {
    createSiteData,
    getSiteData,
    updateSiteData
}