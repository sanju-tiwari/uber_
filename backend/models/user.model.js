const mongoose = require('mongoose');
const argon = require('argon2');
const jwt = require('jsonwebtoken');

const userschema = new mongoose.Schema({
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
        require:true,
        minlength: [10 , "Email must be at least 10 characters long"],
    },
    password:{
        type:String,
        require:true,
        select:false,
        minlength: [6 , "Password must be at least 6 characters long"],
    },
    SocketId:{
        type:String,
    }      
})
userschema.methods.generateAuthToken = function() {
    const token = jwt.sign({id:this.id} , process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    return token;
}
userschema.methods.matchPassword = async function(enteredPassword) {
    return await argon.verify(this.password, enteredPassword);
}
userschema.statics.hashpassword = async function(password) {
    return await argon.hash(password);
}
const usermodels = mongoose.model("users" , userschema)
module.exports = usermodels;