
const mongoose = require("mongoose");
const Doctor=require("../models/Doctor")
const Slot = require("../models/slotSchema");
const Appointment = require("../models/Appointment");

const addDoctor = async (req, res)=>{
    try {
        const { name, gender, department, latestQualification, description, experienceInMonths, address, availability, slots } = req.body;
        console.log(slots)
        const doctor = new Doctor({
        _id: mongoose.Types.ObjectId(),
          name,
          gender,
          department,
          latestQualification,
          description,
          experience:experienceInMonths,
          address,
          availability,
          slots
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

  // const bookAppointment = async (req, res)=>{


  // const { availableSlots , doctorId } = req.body;

  // try {
  //   const doctor = await Doctor.findByIdAndUpdate(doctorId, { availableSlots }, { new: true });
  //   res.status(200).json(doctor);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }


  //   }

    const addSlots = (req, res) => {
      const { startTime, endTime, day } = req.body;
    
      if (!startTime || !endTime || !day) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
      }
    
      const newSlot = new Slot({
        startTime,
        endTime,
        day,
      });
    
      newSlot.save()
        .then(slot => res.json({ _id: slot._id }))
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Error adding slots. Please try again later.' });
        });

    

    };

    const addSlotsIDinDoctor =  async(req, res)=>{
      try{
      const doctorId = req.body.doctorId; // Replace with the actual doctor ID
      const slotIds = req.body.slotIds; // Replace with the actual doctor ID
      const doctor = await Doctor.findById(doctorId);
      doctor.slots = slotIds; // Update the doctor's slots field with the array of slot IDs
      await doctor.save();
    } catch (error) {
      console.error(error);
      alert('Error adding slots. Please try again later.');
    }
    }

    const getSlots = async (req, res) => {
      const doctorId = req.params.doctorId;
      const dayOfWeek = req.params.dayOfWeek;
    
      try {
        // First, find the doctor with the given ID
        const doctor = await Doctor.findById(doctorId).select('slots');
    
        if (!doctor) {
          return res.status(404).send({ message: 'Doctor not found' });
        }
    
        // Map over the arrays of string values and convert them to ObjectIds
        const slotIds = Object.values(doctor.slots)
          .flat()
          .map(id => mongoose.Types.ObjectId(id));
    
        // Query the Slot collection with the slot IDs and dayOfWeek filter
        const slots = await Slot.find({
          _id: { $in: slotIds },
          dayOfWeek: dayOfWeek
        }).select('startTime endTime day isBooked');
    
        if (slots.length === 0) {
          return res.status(404).send({ message: 'No slots found' });
        }
    
        const slotData = slots.map(slot => ({
          id: slot._id,
          start: slot.startTime,
          end: slot.endTime,
          day: slot.day,
          isBooked: slot.isBooked
        })).filter(slot => slot.day === dayOfWeek && !slot.isBooked); // Filter by dayOfWeek parameter and isBooked status
    
        res.send(slotData);
        console.log(slotData)
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error' });
      }
    };
    


    const changeIsBookedStatus = async(req, res) =>{

        try {
          const { slotId } = req.params;
          const { isBooked } = req.body;
          const slot = await Slot.findByIdAndUpdate(
            slotId,
            { isBooked },
            { new: true }
          );
          console.log("this is slot" + slot)
          if (!slot) {
            return res.status(404).send({ error: "Slot not found" });
          }
          res.send(slot);
        } catch (error) {
          console.log(error);
          res.status(500).send({ error: "Internal server error" });
        }

    }
    
    const bookAppointment  = async(req, res)=>{

        const { doctorid, patientid, slot, Day, Time } = req.body;
      
        try {
          // Save the appointment details to the database
          const newAppointment = new Appointment({
            _id: mongoose.Types.ObjectId(),
            doctorid,
            patientid,
            slot,
            Day,
            Time,
          });
          const savedAppointment = await newAppointment.save();
          res.json(savedAppointment);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Failed to save the appointment.' });
        }

    }
    
    module.exports = {addDoctor,getAllDoctors,delDoctor,editDoctor, changeIsBookedStatus, addSlots, addSlotsIDinDoctor, getSlots, bookAppointment}