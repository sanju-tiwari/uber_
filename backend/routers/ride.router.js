const express = require("express")
const router = express.Router()
const {body , query } = require("express-validator")
const ridecontroller = require('../controller/ride.controller.js')
const { auth , auth2 } = require("../middleware/auth.middleware.js")

router.post("/create", auth,
    body("pickup").isString().isLength({min:5}).withMessage("invalid pickup"),
    body('destination').isString().isLength({min:3}).withMessage("invaild destination"),
    body('vehicleType').isString().isIn(['Auto','Car','Bike']).withMessage("choose vechicle first"),
    ridecontroller.createRide
) 
router.get("/get-fare" , auth ,
    query("pickup").isString().isLength({min:3}).withMessage("invalid pickup"),
    query("destination").isString().isLength({min:3}).withMessage("invalid destination "),
    ridecontroller.getfare 
)
router.post("/confirm", auth2 , 
    body("rideId").isMongoId().withMessage("invaild rideID"), ridecontroller.confirmride
)
router.post("/check" , auth2 , 
    body("rideId").isMongoId().withMessage("Invaild message"),
    body("otp").isNumeric().withMessage("Invalid otp"),
    ridecontroller.checkingOtp
)
router.post("/completed" , auth2 , 
    body("rideId").isMongoId().withMessage("Invaild rideID"),
    body("caption").isMongoId().withMessage("Invalid caption ID"),
    ridecontroller.completed
)

module.exports = router