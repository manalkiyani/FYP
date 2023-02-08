const mongoose = require('mongoose');

const admin = new mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
    username:{type:String, required:true,unique:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    profilePic:{type:String,default:''},
    isAdmin:{type:Boolean,default:false},
    accountStatus: {type: String,default:'Active'},
    activePlan: {type: String,default:'Basic'}

},
{timestamps:true});
module.exports = mongoose.model('admin',admin); 