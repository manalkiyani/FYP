const express = require('express');
const {addDoctor, getAllDoctors, delDoctor, editDoctor} =require('../controllers/doctor.controller');

const router = express.Router();

router.post('/adddoctor', addDoctor);
router.get('/getalldoctors', getAllDoctors);
router.delete("/deldoctor/:Id", delDoctor)
router.put("/editdoctor/:Id", editDoctor)


module.exports = router;