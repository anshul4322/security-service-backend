const express = require("express");
const siteController = require('../../controllers/site.controller')
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/registerSite", auth, siteController.saveSiteData);
router.post("/getSiteData", auth, siteController.getData);
router.put("/editSite/:siteId",auth, siteController.updateSiteData);
router.delete("/:siteId", auth, siteController.deleteSiteData)

module.exports = router;