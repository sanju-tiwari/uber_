const jwt = require("jsonwebtoken");
const argon = require("argon2");
const User = require("../models/user.model.js");
const Users = require("../models/caption.model.js")
const BlacklistToken = require("../models/BlacklistToken.model.js");

module.exports.auth = async (req, res, next) => {  
   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
   if(!token){
    return res.status(401).json({
        message: "Authentication token is missing"
    })
   }    
   const blacklist = await BlacklistToken.findOne({ token: token })
   if (blacklist) {
    return res.status(401).json({
        message: "Token is blacklisted, please login again"
    });
   }
   try{
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    const user =  await User.findById(decoded.id)
    req.user = user;
        return next();
   }catch{
    console.error("Error in authentication middleware:");
    return res.status(401).json({
        message: "Invalid authentication token"
    });
   }

}

module.exports.auth2 = async (req, res , next ) => {    
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message: "Authentication token is missing"
        })
    }
    const blacklist = await BlacklistToken.findOne({ token: token });
    if(blacklist){
        return res.status(401).json({
            message:"unauthorized access"
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decoded.id);
        req.user = user;
        return next();
    }catch(error) {
        console.error("Error in authentication middleware");
    }
}



