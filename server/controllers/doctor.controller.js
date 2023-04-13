
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

    const getAllDoctors = async (req, res)=>{
      try {
        const doctors = await Doctor.find().exec();
        res.json(doctors);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }

    function delDoctor(req, res) {
      const id = req.params.Id;
    
      Doctor.findByIdAndRemove(id)
        .exec()
        .then(() =>
          res.status(204).json({
            messsage: "Doctor successfully deleted",
            success: true,
          })
        )
        .catch((err) =>
          res.status(500).json({
            success: false,
          })
        );
    }

    function editDoctor(req, res) {
      const id = req.params.Id;
      const doctorObject = req.body;
      Doctor.findOneAndUpdate({ _id: id }, doctorObject, { new: true })
        .then((product) => {
          res.status(200).json({
            success: true,
            message: "Doctor successfully updated",
            product: product,
          });
        })
        .catch((err) =>
          res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: err.message,
          })
        );
    }

    module.exports = {addDoctor,getAllDoctors,delDoctor,editDoctor}