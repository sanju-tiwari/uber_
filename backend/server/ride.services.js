const mapserver = require("./maps.service.js")
const rideModule = require("../models/ride.module.js")
const crypto = require("crypto")
const captionModule = require("../models/caption.model.js")

async function getfare(pickup , destination){
    if(!pickup || !destination){
        throw new Error("Pickup and destination are required")
    }
    const distanceTime = await mapserver.getDistanceTime(pickup , destination)
    const baseFare = {
     Auto:30,
     Car:50,
     Bike:20
    }
    const perKmRate = {
        Auto:10,
        Car:15,
        Bike:8
    }
    const perMinuteRate ={
        Auto:2,
        Car:3,
        Bike:1.5
    }
    
    const fare = {
         Auto: Math.round(baseFare.Auto + ((distanceTime.distance.value / 1000) * perKmRate.Auto) + ((distanceTime.duration.value / 60) * perMinuteRate.Auto)),
        Car: Math.round(baseFare.Car + ((distanceTime.distance.value / 1000) * perKmRate.Car) + ((distanceTime.duration.value / 60) * perMinuteRate.Car)),
        Bike: Math.round(baseFare.Bike + ((distanceTime.distance.value / 1000) * perKmRate.Bike) + ((distanceTime.duration.value / 60) * perMinuteRate.Bike))
    }
    return fare
}
module.exports.getfare = getfare
function getotp(num){
  function genopt(num){
    const otp = crypto.randomInt(Math.pow(10 , num -1 ), Math.pow(10, num)).toString()
    return otp  
  }
   return genopt(num)
}
module.exports.createRide = async({
    user , pickup , destination , vehicleType
})=>{
    if(!user || !pickup || !destination || !vehicleType ){
        throw new Error("All feild are reruired") 
    }
    const fare = await getfare(pickup , destination)
    const ride = await rideModule.create({
        user,
        pickup,
        destination,
        vehicleType,
        fare:fare[vehicleType],
        otp:getotp(6)
    })
      console.log("Database mein save hui nayi ride:", ride)

    return ride

}
module.exports.confirmride = async ({ rideId, caption }) => { 
    if (!rideId) {
        throw new Error("Ride ID is required.");
    }
        if (!caption) {
        throw new Error("caption  is required.");
    }
    console.log("captionid checking " , caption )
    try {
        const updatedRide = await rideModule.findByIdAndUpdate(
            rideId, 
            {
                status: "accepted",
                caption: caption
            },
            { new: true } 
        ).populate("user").populate("caption").select("+otp"); 

        if (!updatedRide) {
            throw new Error("Ride not found with the provided ID.");
        }
        return updatedRide;

    } catch (error) {
        console.error("Error confirming ride:", error);
        throw error;
    }
};
module.exports.checkingotp = async ({ rideId, otp }) => { 
    try {
        const ride = await rideModule.findOne({
            _id: rideId,
        })
        .populate("user")
        .populate("caption")
        .select("+otp"); 
        if (!ride) {
            const error = new Error('Ride not found');
            error.status = 404;
            throw error;
        }

        if (ride.status !== 'accepted') {
            const error = new Error(`Ride status is "${ride.status}", expected "accepted".`);
            error.status = 400;
            throw error;
        }

        if (ride.otp !== otp) {
            const error = new Error('Invalid OTP');
            error.status = 400;
            throw error;
        }

        const updatedRide = await rideModule.findOneAndUpdate(
            { _id: rideId },
            { status: 'ongoing'},
            { new: true }
        )
        .populate("user") 
        .populate("caption") 
        .select("+otp"); 


        if (!updatedRide) {
             const error = new Error('Failed to update ride status.');
             error.status = 500;
             throw error;
        }

        return updatedRide; 

    } catch (error) {
        console.error("Error confirming ride:", error.message, error);
        const handledError = new Error(error.message || 'An unexpected error occurred.');
        handledError.status = error.status || 500;
        throw handledError;
    }
};
module.exports.completed = async ({ rideId , caption:captionId }) => {
  if(rideId === undefined || rideId === null) {
    throw new Error("Ride ID is required.");
  }
    
  try {
    const ride = await rideModule.findByIdAndUpdate(
       {_id:rideId},
      { status: "completed" },
      { new: true }
    ).populate("user").populate("caption").select("+otp"); ;

    if (!ride) {
      throw new Error("Ride not found with the provided ID.");
    }
   
      const captionDocument = await captionModule.findById(captionId);
    if (!captionDocument) {
      throw new Error("Caption not found for the ride.");
    }

        if (!captionDocument) {
            throw new Error("Caption not found for the ride.");
        }

        const fare = ride.fare || 0;
        captionDocument.totalearning = (captionDocument.totalearning || 0) + fare;
        
        await captionDocument.save();

        ride.caption = captionDocument;

    return ride;
    
  } catch (error) {
    console.log(error.message)
    throw new Error("Internal server error");
  }

}