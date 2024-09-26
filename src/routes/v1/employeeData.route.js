const express = require("express");
const employeeController = require('../../controllers/employee.controller');
const empValidation = require('../../validations/employee.validation');
const validate = require('../../middlewares/validate');
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/registerEmployee", auth, validate(empValidation.employeeSchema), employeeController.saveEmployeeData)
router.put("/editEmployee/:empId",auth, employeeController.updateEmployeeData);
router.get("/getEmployeeData", auth, employeeController.getData)

module.exports = router;