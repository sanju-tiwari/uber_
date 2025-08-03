const jwt = require("jsonwebtoken");
const argon = require("argon2");
const mongoose = require("mongoose");

const captionSchema = new mongoose.Schema({ 
     fullName:{
            firstname:{
                type:String,
                required:true,
                minlength: [3 , "First name must be at least 3 characters long"],
            },
            lastname:{
                type:String,
                minlength:[3 , "Last name must be at least 3 characters long"],
            }
     },
     email:{
            type:String,
            unique:true,
            required:true,
            minlength: [10 , "Email must be at least 10 characters long"],
        },
    password:{
            type:String,
            required:true,
            select:false,
            minlength: [6 , "Password must be at least 6 characters long"],
        },
    SocketId:{ type:String },

    status:{
        type:String,
        enum:["active" , "inactive"],
        default:"inactive",
    },
    vehicle:{
      color:{
        type:String,
        required:true,
        minlength: [2 , "Color must be at least 3 characters long"],
      },
      plate:{
        type:String,
        required:true,
        minlength: [3 , "Plate must be at least 3 characters long"],
      },
      vehicleType:{
        type:String,
        required:true,
        enum:["Car" , "Bike" , "Auto"],
        minlength: [3 , "Vehicle type must be at least 3 characters long"],

      },
      capacity:{
        type:Number,
        required:true,
        min: [1 , "Capacity must be at least 1"],
      }
    },
    location: {
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: {
    type: [Number],
  },
} ,
  totalearning:{
    type:Number,
    default:0
  }
})
captionSchema.index({ location: "2dsphere" });
captionSchema.methods.generateAuthtoken = function() {
    const token =  jwt.sign({id:this.id} , process.env.JWT_SECRET , {expiresIn:"24h"} )
    return token;
}
captionSchema.methods.matchPassword = async function(enteredPassword) {
    return await argon.verify(this.password, enteredPassword);
}
captionSchema.statics.hashPassword = async function(password) {
    return await argon.hash(password);
}

const captionmodel = mongoose.model("caption" , captionSchema);
module.exports = captionmodel;
