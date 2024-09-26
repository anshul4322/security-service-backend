const siteService = require("../services/site.service");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const saveSiteData = async(req,res) => {
    const data = await siteService.createSiteData(req.body);
    res.status(httpStatus.CREATED).send({data})
}

const getData = catchAsync(async(req,res) => {
    const { companyId } = req.body;
    const data = await siteService.getSiteData(companyId);
    if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
    }
    else{
        res.send(data).status(httpStatus.OK);
    }
})

const updateSiteData = async (req, res, next) => {
    const { siteId } = req.params;
    const updatedData = req.body;
    try {
        const updatedSite = await siteService.updateSiteData(siteId, updatedData);
        res.status(httpStatus.OK).json(updatedSite);
    } catch (error) {
        next(error);
    }
};

const deleteSiteData = async (req, res, next) => {
    const { siteId } = req.params;
  
    try {
      const site = await siteService.deleteSite(siteId);
  
      if (!site) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Site not found' });
      }

      return res.status(httpStatus.OK).json({ message: 'Site deleted successfully.' });
    } catch (error) {
      next(error);
    }
};

module.exports = {
    saveSiteData,
    getData,
    updateSiteData,
    deleteSiteData
};