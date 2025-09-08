const mapservices = require("../server/maps.service.js")
const { validationResult} = require("express-validator")

module.exports.getcoordinate = async(req , res)=>{
   const errors = validationResult(req)

     if(!errors.isEmpty()){
        return res.status(404).json({
            errors:errors.array()
        })
     }   

    const {address} = req.query     
    try{
      const coordinate = await mapservices.getAddressCordinate(address)
      res.status(200).json(coordinate)  

    }catch (error){
        res.status(404).json({
            message:"Coordinates not found"
        })
        console.log(error)
    }
}
module.exports.getDistanceTime = async(req , res)=>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array()
            })
        }
        const {origin , destination} = req.query
        
        const destinationTime = await mapservices.getDistanceTime(origin , destination)
        res.status(200).json(destinationTime)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:"Internal server error"
        })
    }
}
module.exports.getautosuggesstion = async(req , res)=>{

    const error = validationResult(req)
    if(!error.isEmpty){
       return res.status(400).status({
            error:error.array()
        })
    }
    try {
     const {input} = req.query
     const suggesstion = await mapservices.getautosuggesstion(input)
     res.status(200).json(suggesstion) 
    } catch (error) {
        console.log(error.message)
    }
}