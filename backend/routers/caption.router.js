const express = require("express");
const {body} = require("express-validator")
const CaptionController = require("../controller/caption.controller.js");
const {auth2} = require("../middleware/auth.middleware.js");
const routers = express.Router();

routers.post("/register" , [
    body("fullName.firstname").isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body("fullName.lastname").isLength({min:3}).withMessage("Last name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate must be at least 3 characters long"),
    body("vehicle.vehicleType").isLength({min:2}).withMessage("Vehicle type must be at least 2 characters long"),
    body("vehicle.capacity").isNumeric().withMessage("Capacity must be a number and at least 1"),
] , CaptionController.registercaption);

routers.post("/login", [
   body("email").isEmail().withMessage("Please enter a valid email"),
   body("password").isLength({min:6}).withMessage("Please enter a valid password"),
], CaptionController.logincaption);

routers.get("/profile", auth2 , CaptionController.getcaptionProfile);

routers.get("/logout", auth2 , CaptionController.logoutcaption);

module.exports = routers;


