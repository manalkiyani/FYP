const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const application = new Schema ({
    _id : mongoose.Schema.Types.ObjectId,
    //personal info
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type : String, required : true},
    phone : {type : String, required : true},
    address : {type : String, },
    //experience
    experience :[{
        title : {type : String, required : true},
        company : {type : String, required : true},
        location : {type : String, },
        startDate : {type : String, },
        endDate : {type : String, },
        description : {type : String, },
    }],
    //education
    education :[{
        institue : {type : String, required : true},
        degree : {type : String, },
        major : {type : String, },    
        startDate : {type : String, },
        endDate : {type : String, },
        description : {type : String, },
        grade:{type:String},
    
    }],
  

    facebook:{type:String},
    linkedIn:{type:String},
    twitter:{type:String},
    website:{type:String},

    //message
    message : {type : String, },

    //resume
    resume : {type : String, required : true},

    //remarks
    recruiterRemarks : {type : String, },
    status : {type : String, default : "pending", enum : ["pending","hired","interview","accepted","notFit","rejected","further"]},
})

module.exports = mongoose.model('application',application)