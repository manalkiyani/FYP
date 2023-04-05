
const mongoose = require("mongoose");
const Doctor=require("../models/Doctor")

const addDoctor = async (req, res)=>{
    try {
        const { name, gender, department, latestQualification, description, experienceInMonths, address, availability } = req.body;
        const doctor = new Doctor({
        _id: mongoose.Types.ObjectId(),
          name,
          gender,
          department,
          latestQualification,
          description,
          experience:experienceInMonths,
          address,
          availability  
        });
        const savedDoctor = await doctor.save();
        res.status(201).json(savedDoctor);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error adding doctor. Please try again later.' });
      }
    }

    module.exports = {addDoctor,}