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

const updateSiteData = async (req, res) => {
    const { siteId } = req.params;
    const updatedData = req.body;
    try {
        const updatedSite = await siteService.updateSiteData(siteId, updatedData);
        res.status(httpStatus.OK).json(updatedSite);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    saveSiteData,
    getData,
    updateSiteData
};