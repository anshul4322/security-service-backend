const express = require("express");
const attendanceController = require('../../controllers/attendance.controller')
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/daily",auth, attendanceController.saveData)
router.get("/getAttendance", attendanceController.getData)
router.delete("/", auth, attendanceController.deleteData)
router.put("/daily",auth, attendanceController.updateAttendance);

module.exports = router;