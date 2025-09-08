const axios = require("axios");
const captionmodel = require("../models/caption.model.js")

module.exports.getAddressCordinate = async (address)=>{
const apikey = process.env.Google_API
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

try {
     const response = await axios.get(url)
     if(response.data.status === "OK"){
        const location = response.data.results[0].geometry.location
        return {
            ltd: location.lat,
            lng:location.lng
        }
     }else{
        throw new Error("Unable to fetch cordinate")
     }
} catch (error) {
    console.log(error.message)
}
}
module.exports.getDistanceTime = async (origin , destination)=>{
    if(!origin || !destination  ){
        throw new Error("Origin and destination are required")
    }
    const apikey = process.env.Google_API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;

    try {
        const response = await axios.get(url)
        if(response.data.status === "OK"){
            if(response.data.rows[ 0 ].elements[ 0 ].status ===  "ZERO_RESULTS"){
                throw new Error("No route found") 
            }
            return response.data.rows[ 0 ].elements
            [ 0 ]
        }        
    } catch (error) {
        console.log(error.message)
    }
}
module.exports.getautosuggesstion = async(input) => {
   if(!input){
     throw new Error("query is requires")   
   }
   const apiKey = process.env.Google_API
   const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`
        
    try {
    const response = await axios.get(url)
    if(response.data.status === "OK"){
        return response.data.predictions
    }else{
        throw new Error("Unable to fetch suggesstion")
    }  

    } catch (error) {
        console.error(error.message)
    }
}
module.exports.getInfoOfRiderRadius = async(lat, lng, radius) => {
    const caption = await captionmodel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371] 
            }
        }
    });
    return caption;
}

