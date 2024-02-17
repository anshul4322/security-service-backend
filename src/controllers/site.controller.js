const siteService = require("../services/site.service");
const httpStatus = require("http-status");

const saveData = (async(req,res) => {
    const data = await siteService.createSiteData(req.body);
    res.status(httpStatus.CREATED).send({data})
})

const getData = (async(req,res) => {
    let data;
    data = await siteService.getSiteData(req.body);
    if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
    }
    else{
        res.send(data);
    }
})

module.exports = {
    saveData,
    getData
};