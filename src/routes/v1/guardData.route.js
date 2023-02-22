const express = require("express");
const guardController = require('../../controllers/guard.controller')
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/form", auth, guardController.saveData)

module.exports = router;