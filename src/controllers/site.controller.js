const siteService = require("../services/site.service");
const httpStatus = require("http-status");

const saveData = (async(req,res) => {
    const data = await siteService.createSiteData(req.body);
    res.status(httpStatus.CREATED).send({data})
})

module.exports = {
    saveData,
};