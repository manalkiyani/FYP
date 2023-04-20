const express = require('express');
const router = express.Router();
const {addPatient, loginPatient} = require("../controllers/patient.controller")


router.post("/addpatient", addPatient)
router.post("/loginpatient", loginPatient)

module.exports = router;