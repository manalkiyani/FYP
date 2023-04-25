const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctor = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String},
    gender: { type: String },
    department: { type: String },
    profilePic: { type: String, default: "" },
    latestQualification: { type: String },
    description:{ type: String},
    rating: [{type: Number }],
    review: [{type: String}],
    avgRating: {type: Number},
    experience:{type: String}, /////years
    address:{type: String},
    bookedSlots: { type: Object },
    availableSlots: {type: Object},
    availability:{type: Object},// this will have key value pairs like: Mon: 9-16, tue: 12-14
    slots: 
     {type: Object},
      //required: true
    
    //availableSlots: [{type: String, match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/}], // <-- array field for available time slots  

}

);

module.exports = mongoose.model("doctor", doctor);
