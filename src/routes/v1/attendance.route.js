const express = require("express");
const attendanceController = require('../../controllers/attendance.controller')
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/daily",attendanceController.saveData)
router.get("/getAttendance", attendanceController.getData)
router.delete("/", attendanceController.deleteData)

module.exports = router;