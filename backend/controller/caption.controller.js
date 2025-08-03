const { totalmem } = require("os");
const BlacklistTokenModel = require("../models/BlacklistToken.model.js");
const captionmodel = require("../models/caption.model.js");
const captionServer = require("../server/caption.server.js");
const { validationResult } = require("express-validator");

module.exports.registercaption = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle, location } = req.body;
    
    console.log("INCOMING DATA FROM FRONTEND:", req.body);

    const verifyemail = await captionmodel.findOne({ email });
    if (verifyemail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await captionmodel.hashPassword(password);

    const captionPayload = {
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      vehicle,
    };

    if (
      location &&
      location.type === "Point" &&
      Array.isArray(location.coordinates) &&
      location.coordinates.length === 2
    ) {
      captionPayload.location = location;
    } else {
      console.log("Location is invalid or missing, skipping.");
    }

    const caption = await captionmodel.create(captionPayload);

    if (!caption) {
      throw new Error("Caption creation returned null.");
    }

    const token = caption.generateAuthtoken();
    res.cookie("token", token);

    res.status(201).json({
      message: "Caption registered successfully",
      caption: {
        id: caption._id,
        fullName: caption.fullName,
        email: caption.email,
        vehicle: caption.vehicle,
        location: caption.location,
      },
      token: token,
    });

  } catch (error) {
    console.error("ERROR DURING REGISTRATION:", error.message);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
module.exports.logincaption = async(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            errors: error.array()
        });
    }
    const {email , password} = req.body
    try {
     const verifyemail = await captionmodel.findOne({email}).select("+password")
     if(!verifyemail){
      return res.status(401).json({
            message:"Invalid email or password"
        })
     }
      const ismatch = await verifyemail.matchPassword(password)
      if(!ismatch){
        return res.status(401).json({
            message:"Invalid email or password"
        })
      }

      const token = verifyemail.generateAuthtoken();
      res.cookie("token", token);
      res.status(200).json({ 
        message: "Caption logged in successfully",
        caption: {
            id: verifyemail._id,
            fullName: verifyemail.fullName,
            email: verifyemail.email,
            vehicle: verifyemail.vehicle
        },
        token: token
      });

    } catch (error) {
        console.error("Error logging in caption:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
module.exports.getcaptionProfile = async(req, res) => {     
    try{
        const user = req.user
        if(!user){
            return res.status(404).json({ error: "Caption not found" });
        }
         res.status(200).json({
            caption:{
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                vehicle:user.vehicle,
                status: user.status,
                totalearning: user.totalearning,
            }
         })

    }catch(error){
        console.error("Error fetching caption profile:", error);
        return res.status(500).json({ error: "Internal server error" });
    }




}
module.exports.logoutcaption = async(req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];    
    await BlacklistTokenModel.create({ token });
    res.clearCookie("token");
    if (!token){
        return res.status(401).json({ error:"No token provided"});
    }
    try{
        res.status(200).json({ message:"logged out successfully"});
    }catch (error) {
        console.error("Error logging out caption:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

