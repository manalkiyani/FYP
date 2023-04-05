const mongoose = require("mongoose");

const doctor = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    doctorid: { type: Schema.Types.ObjectId, ref: "doctor" },
    Day:{type: String},
    Time: {type: String},
    patientName:{type: String},
    patientContact: {   //upto 11 digits, starts with 03 for pakistani numbers.
      type: String,     //type is string to allow leading 0 otherwise they will be ignored by js
      required: true,
      validate: {
        validator: function(v) {
          return /^03\d{9}$/.test(v);
        }
      },
    },
}

);

module.exports = mongoose.model("doctor", doctor);