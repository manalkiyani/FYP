const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    doctorid: { type: Schema.Types.ObjectId, ref: "doctor" },
    Day:{type: String},
    Time: {type: String},
    patientid: { type: Schema.Types.ObjectId, ref: "User" },
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Slot',
      //required: true
    },
    status: {
      type: String,
      default: 'pending'
    },
    isComplete: {
      type: Boolean,
      default: false
    },
    name:{
      type: String
    }
    ,sessionType:{
      type: String,
    },
    email:{
      type:String
    },
    gender:{
      type:String
    },
    age:{
      type:Number
    },
    description:{
      type: String
    }
  }
);

// Define the `markExpiredAppointmentsAsComplete` function on the `appointmentSchema.statics` object
appointmentSchema.statics.markExpiredAppointmentsAsComplete = function() {
  const Appointment = this;

  // Populating the `slot` field to get the `endTime` field from `slotSchema`
  Appointment.find({ isComplete: false })
    .populate({
      path: 'slot',
      select: 'endDate'
    })
    .then(appointments => {
      const expiredAppointments = appointments.filter(appointment => {
        return appointment.slot.endDate <= Date.now();
      });

      expiredAppointments.forEach(appointment => {
        appointment.isComplete = true;
        appointment.status = 'cancelled'; // set the status to cancelled
        appointment.save();
      });
    })
    .catch(err => {
      console.error(err);
    });
}

// Define the `Appointment` model using the `appointmentSchema`
const Appointment = mongoose.model('Appointment', appointmentSchema);

setInterval(() => {
  Appointment.markExpiredAppointmentsAsComplete();
}, 30000); // check every minute

module.exports = Appointment;
