const express = require('express');
const {addDoctor} =require('../controllers/doctor.controller');

const router = express.Router();

router.post('/adddoctor', addDoctor);


module.exports = router;