const express = require("express");
const siteController = require('../../controllers/site.controller')
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/form", auth, siteController.saveData)

module.exports = router;