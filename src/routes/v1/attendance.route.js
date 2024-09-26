const express = require("express");
const attendanceController = require('../../controllers/attendance.controller')
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/getAttendance", auth, attendanceController.getData)
router.delete("/", auth, attendanceController.deleteData)
router.put("/dailyAttendance",auth, attendanceController.updateAttendance);

module.exports = router;