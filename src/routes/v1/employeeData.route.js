const express = require("express");
const employeeController = require('../../controllers/employee.controller')
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/form",auth, employeeController.saveData)
router.get("/getEmployeeData", employeeController.getData)

module.exports = router;