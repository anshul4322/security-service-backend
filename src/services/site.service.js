const {SiteData} = require('../models');
const httpStatus  = require("http-status");
const ApiError = require('../utils/ApiError');

const createSiteData = async (site) => {
    let siteId = "SA" + Math.random().toString().substr(2, 4);
  
    // Check if the site is already registered
    if (await SiteData.isSiteRegistered(site.siteName, site.companyId)) {
      throw new ApiError(httpStatus.OK, "Site Already Registered");
    }
  
    try {
      // Create and save the new site data
      const data = await SiteData.create({ ...site, siteId });
      return data;
    } catch (err) {
      console.error("Error creating site:", err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create site");
    }
};

const updateSiteData = async (siteId, updatedData) => {
    try {
      // Find the site by its siteId and update it
      const updatedSite = await SiteData.findOneAndUpdate(
        { siteId },
        { $set: updatedData },
        { new: true, runValidators: true }
      );
  
      if (!updatedSite) {
        throw new ApiError(httpStatus.NOT_FOUND, "Site not found");
      }
  
      return updatedSite;
    } catch (err) {
      console.error("Error updating site:", err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update site");
    }
};

const getSiteData = async (companyId) => {
    return SiteData.find({ companyId });
}

const deleteSite = async (siteId) => {
    console.log(siteId)
    try {
      // Find and delete the site by siteId
      const site = await SiteData.findOneAndDelete({ siteId });
  
      if (!site) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Site not found');
      }

      return site;
    } catch (err) {
      console.error('Error deleting site:', err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete site');
    }
};

module.exports = {
    createSiteData,
    getSiteData,
    updateSiteData,
    deleteSite
}