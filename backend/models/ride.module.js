const mongoose = require("mongoose")
const rideschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    caption:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'caption'
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending' , 'ongoing' , 'accepted' ,'completed' , 'cancelled'],
        default:'pending'
    },
    duration:{
        type:String,
    },
    distance:{
        type:Number
    },
    paymentID:{
        type:Number
    },
    orderID:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false,
        required:true
    }    
})

const rideModule = mongoose.model("ride" , rideschema)
module.exports = rideModule
