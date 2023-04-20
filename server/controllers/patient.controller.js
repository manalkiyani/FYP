const mongoose = require("mongoose");
const Doctor=require("../models/Doctor")
const Slot = require("../models/slotSchema");
const Patient = require("../models/Patient");


const addPatient =  async (req, res) => {
    try {
        const { name, email, age, gender, contact_info, password } = req.body;
        const patient = new Patient({
          name,
          email,
          age,
          gender,
          contact_info,
          password
        });
        await patient.save();
        res.status(201).json(patient);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
  };

  const loginPatient = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const patient = await Patient.findOne({ email });
  
      if (!patient) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      if (patient.password !== password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      res.json({ message: "Logged in successfully", patient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  
  
  module.exports = {addPatient, loginPatient}