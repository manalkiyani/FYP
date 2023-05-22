const mongoose = require("mongoose");
const Doctor = require("../models/Doctor");
const Slot = require("../models/slotSchema");
const Appointment = require("../models/Appointment");
const Template = require("../models/Template");
const { response } = require("express");

const addDoctor = async (req, res) => {
  try {
    const {
      image,
      name,
      gender,
      department,
      latestQualification,
      description,
      experienceInMonths,
      address,
      availability,
      slots,
    } = req.body;

    const doctor = new Doctor({
      _id: mongoose.Types.ObjectId(),
      image,
      name,
      gender,
      department,
      latestQualification,
      description,
      experience: experienceInMonths,
      address,
      availability,
      slots,
    });
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error adding doctor. Please try again later." });
  }
};

const getDoctor = async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    const doctor = await Doctor.find({ _id: doctorId });
    console.log("doctor", doctor);
    res.status(200).json({ doctor });
  } catch (error) {
    console.log(error);
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().exec();
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

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

async function getListOfDoctors(req, res) {
  console.log("Req.body", typeof req.body.doctorIds);

  //find blogs which have ids in the array
  Doctor.find({ _id: { $in: req.body.doctorIds } })

    .then((allDoctors) => {
      return res.status(200).json({
        success: true,
        message: "A list of all doctors",
        Doctors: allDoctors,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
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
const addSlots = (req, res) => {
  const { startTime, endTime, day } = req.body;

  if (!startTime || !endTime || !day) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  const newSlot = new Slot({
    startTime,
    endTime,
    day,
  });

  newSlot
    .save()
    .then((slot) => res.json({ _id: slot._id }))
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error adding slots. Please try again later." });
    });
};

const addSlotsIDinDoctor = async (req, res) => {
  try {
    const doctorId = req.body.doctorId; // Replace with the actual doctor ID
    const slotIds = req.body.slotIds; // Replace with the actual doctor ID
    const doctor = await Doctor.findById(doctorId);
    doctor.slots = slotIds; // Update the doctor's slots field with the array of slot IDs
    await doctor.save();
  } catch (error) {
    console.error(error);
    alert("Error adding slots. Please try again later.");
  }
};

const getSlots = async (req, res) => {
  const doctorId = req.params.doctorId;
  const dayOfWeek = req.params.dayOfWeek;

  try {
    // First, find the doctor with the given ID
    const doctor = await Doctor.findById(doctorId).select("slots");

    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    // Map over the arrays of string values and convert them to ObjectIds
    const slotIds = Object.values(doctor.slots)
      .flat()
      .map((id) => mongoose.Types.ObjectId(id));

    // Query the Slot collection with the slot IDs and dayOfWeek filter
    const slots = await Slot.find({
      _id: { $in: slotIds },
      dayOfWeek: dayOfWeek,
    }).select("startTime endTime day isBooked");

    if (slots.length === 0) {
      return res.status(404).send({ message: "No slots found" });
    }

    const slotData = slots
      .map((slot) => ({
        id: slot._id,
        start: slot.startTime,
        end: slot.endTime,
        day: slot.day,
        isBooked: slot.isBooked,
      }))
      .filter((slot) => slot.day === dayOfWeek && !slot.isBooked); // Filter by dayOfWeek parameter and isBooked status

    res.send(slotData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

const changeIsBookedStatus = async (req, res) => {
  try {
    const { slotId } = req.params;
    const { isBooked } = req.body;
    const slot = await Slot.findByIdAndUpdate(
      slotId,
      { isBooked },
      { new: true }
    );
    console.log("this is slot" + slot);
    if (!slot) {
      return res.status(404).send({ error: "Slot not found" });
    }
    res.send(slot);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const bookAppointment = async (req, res) => {
  const { doctorid, patientid, slot, Day, Time,name, sessionType, email, gender, description, age } = req.body;

  try {
    // Save the appointment details to the database
    const newAppointment = new Appointment({
      _id: mongoose.Types.ObjectId(),
      doctorid,
      patientid,
      slot,
      Day,
      Time,
      name,
      sessionType,
      email,
      gender,
      description,
      age
    });
    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save the appointment." });
  }
};

const AppointmentsIDtoTemplate = async (req, res) => {
  try {
    const appointmentId = req.body.appointmentId;
    const templateId = req.body.templateId;

    const template = await Template.findById(templateId);
    if (!template) {
      throw new Error("Template not found");
    }
    const updatedData = {
      ...template.data,
      appointments: [...(template.data.appointments || []), appointmentId],
    };
    await Template.findByIdAndUpdate(
      templateId,
      { data: updatedData },
      { new: true }
    );
    res.send({ message: "Template updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getAppointmentsToViewer = async (req, res) => {
  try {
    console.log("here in backend")
    const patientId = req.body.patientId;
    console.log(patientId+" this is patientid");
    const appointments = await Appointment.find({
      patientid: patientId,
    }).exec();
    res.send(appointments);
    console.log(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Could not retrieve appointments");
  }
};

const getAppointmentstoAdmin = async (req, res) => {
  const templateId = req.body.TEMPLATEID;
  console.log('this is tempid '+templateId);

  try {
    const template = await Template.findById(templateId);
    const { appointments } = template.data;

    const incompleteAppointments = [];

     for (const appointmentId of appointments) {
      const appointment = await Appointment.findById(appointmentId)
        .populate({
          path: "doctorid",
          select: "name department gender address latestQualification"
        })
        .populate({
          path: "patientid",
          select: "username"
        })
        .exec();

      if (!appointment.isComplete) {
        incompleteAppointments.push(appointment);
      }
    }

    const appointmentInfo = incompleteAppointments.map((appointment) => {
      const { _id, name, sessionType, Day, Time, doctorid, patientid, status } = appointment;
      console.log(_id);

      const patientName = patientid ? patientid.username : "Unknown";

      return {
        _id,
        status,
        Day,
        Time,
        DoctorName: doctorid.name,
        DoctorGender: doctorid.gender,
        DoctorQualification: doctorid.latestQualification,
        DoctorAddress: doctorid.address,
        Department: doctorid.department,
        PatientName: name,
        sessionType
      };
    });

    res.json(appointmentInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const doctorCompletesAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.body.appointmentid,
      {
        $set: {
          status: "completed",
          isComplete: true,
        },
      },
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const DoctorIDtoTemplate = async (req, res) => {
  try {
    const doctorid = req.body.doctorId;
    const templateId = req.body.templateId;
    console.log(doctorid + " this is it doctorid");

    const template = await Template.findById(templateId);
    if (!template) {
      throw new Error("Template not found");
    }
    const updatedData = {
      ...template.data,
      doctors: [...(template.data.doctors || []), doctorid],
    };
    await Template.findByIdAndUpdate(
      templateId,
      { data: updatedData },
      { new: true }
    );
    console.log("Template updated successfully");
    res.send({ message: "Template updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
const delDoctorIdFromTemplate = async (req, res) => {
  try {
    const { TEMPLATEID, doctorid } = req.body;
    console.log("this is template id " + TEMPLATEID);
    console.log("this is doctor id " + doctorid);

    // Find the template by matching id with req.body.TEMPLATEID
    const template = await Template.findById(TEMPLATEID);
    if (!template) {
      console.log("Template not found");
      return res.status(404).json({ error: "Template not found" });
    }

    // Delete the doctorid from the doctors array in the template's data object
    const doctors = template.data.doctors;
    const updatedDoctors = doctors.filter((id) => id !== doctorid);
    if (doctors.length === updatedDoctors.length) {
      console.log("Doctor not found in template");
      return res.status(404).json({ error: "Doctor not found in template" });
    }
    console.log(template.data.doctors);
    template.data.doctors = updatedDoctors;

    console.log(template.data.doctors);
    // Save the updated template
    try {
      await template.save();
      console.log("Doctor Remove Succesfully");
      res.status(200).json({ message: "Doctor removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addDoctor,
  getAllDoctors,
  delDoctor,
  editDoctor,
  changeIsBookedStatus,
  addSlots,
  addSlotsIDinDoctor,
  getSlots,
  bookAppointment,
  AppointmentsIDtoTemplate,
  getAppointmentsToViewer,
  getAppointmentstoAdmin,
  doctorCompletesAppointment,
  DoctorIDtoTemplate,
  delDoctorIdFromTemplate,
  getListOfDoctors,
  getDoctor,
};
