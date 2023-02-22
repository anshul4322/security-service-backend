const express = require('express');
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const guardDataRoute = require("./guardData.route");
const siteRoute = require("./site.route");
const attendanceRoute = require("./attendance.route")

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/guardData", guardDataRoute);
router.use("/siteData", siteRoute);
router.use("/attendance",attendanceRoute);


module.exports = router;