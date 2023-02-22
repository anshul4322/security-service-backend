const guardService = require("../services/guard.service");
const httpStatus = require("http-status");

const saveData = (async(req,res) => {
    const data = await guardService.createGuardData(req.body);
    res.status(httpStatus.CREATED).send({data})
})

module.exports = {
    saveData,
};