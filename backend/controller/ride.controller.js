const rideservice = require("../server/ride.services.js")
const {validationResult} = require("express-validator")
const usermodel = require("../models/user.model.js")
const mapserver = require("../server/maps.service.js")
const { sendmessagetosocket } = require("../socket.js")
const rideModule = require("../models/ride.module.js")

module.exports.createRide = async (req, res, next) => {
   
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
         if (!req.user) {
        return res.status(401).json({ message: "Authentication failed. Please provide a valid token." });
    }

    const { vehicleType, destination, pickup, fare } = req.body;
    const userId = req.user._id;

    try {
        const newRide = await rideservice.createRide({
            user: userId, vehicleType, destination, pickup, fare
        });

        const pickupCoordinates = await mapserver.getAddressCordinate(pickup);
        if (!pickupCoordinates) {
            return res.status(400).json({ message: "Could not find coordinates for the pickup address." });
        }
        const nearbyDrivers = await mapserver.getInfoOfRiderRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 50);
        await newRide.populate('user'); 
        if (!newRide.user) {
            return res.status(500).json({ message: "Failed to process ride due to user data inconsistency." });
        }

        const userName = `${newRide.user.fullName?.firstname || ''} ${newRide.user.fullName?.lastname || ''}`.trim() || 'A Rider';

        const rideDataForDriver = {
            _id: newRide._id,
            destination: newRide.destination,
            pickup: newRide.pickup,
            fare: newRide.fare,
            user: { name: userName }
        };

        const notificationPromises = nearbyDrivers.map(caption => {
            return sendmessagetosocket(caption.SocketId, { event: "new-ride", data: rideDataForDriver });
        });
        await Promise.all(notificationPromises);

        res.status(201).json(newRide);

    } catch (error) {
        console.error("Error creating ride:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.confirmride = async (req ,res , next)=>{
    console.log( "req in body by confirmride" , req.body)
   const error = validationResult(req)
   if(!error.isEmpty()){
    return res.status(400).json({
        errors:error.array()
    })
   }   
   const {rideId ,caption } = req.body
   console.log( "rideid-->" , rideId)
   console.log("captionride id --> " , req.body )
   try {
    const ride = await rideservice.confirmride({rideId , caption:caption})
    console.log( "ride-->>>" , ride)
 
    sendmessagetosocket(ride.user.SocketId , {
        event:"confirm-ride",
        data:ride
    })
     return res.status(200).json(ride)
   } catch (error) {
    console.log(error.message)
    res.status(400).json({
        errors:error.message
    })
   }
}

module.exports.getfare = async (req , res , next )=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }
    const {pickup,destination} = req.query
    if (!pickup || !destination) {
    return res.status(400).json({ error: 'Pickup and destination are required.' });
  }
    try{
      const getride = await rideservice.getfare(pickup , destination)
      res.status(200).json(getride)  
    } catch (error) {
        console.error(error.message)
    }
}

module.exports.checkingOtp = async(req ,res , next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
       return res.status(400).json({
            errors:error.array()
        })
    }
   const {rideId , otp} = req.body
   try {
    
    if(!rideId){
      return  res.status(400).json({
            errors:"rideId not found "  
        })
    }
    if(!otp){
      return  res.status(400).json({
            errors:"Otp not found "  
        })
    }
    const ride = await rideservice.checkingotp({rideId , otp , caption:req.body.caption })
    console.log("checking otp ride data" , req.body.caption)
    sendmessagetosocket(ride.user.SocketId,{
        event:"checking-otp",
        caption:ride.caption,
        data:ride
    })
    res.status(200).json(ride)
   } catch (error) {
    console.log(error.message)
    res.status(500).json({
        error:"Internal server error"
    })
   }
}

module.exports.completed = async (req ,res , next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            errors:error.array()
        })
    }
    const {rideId , caption } = req.body
    console.log( "rideid --> by", req.body)
    if(!rideId){
        return res.status(400).json({
            error:"rideId not found"
        })
    }
    try {
     const ride = await rideservice.completed({rideId , caption:caption}) 
        if(!ride) {
            return res.status(404).json({ message: "Ride not found or already canceled." });
        }
        sendmessagetosocket(ride.user.SocketId, {
            event: "completed-ride",
            data: ride
        });
        res.status(200).json(ride);

    } catch (error) {
        console.error("Error canceling ride:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

