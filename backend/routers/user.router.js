const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const controller = require("../controller/user.controller.js");
const authmiddleware = require("../middleware/auth.middleware.js");

router.post("/register" , [
    body("fullName.firstname").isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body("fullName.lastname").isLength({min:3}).withMessage("Last name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
] , controller.registerUser);

router.post("/login" , [
    body("email").isEmail().withMessage("Please enter a valid email "),
    body("password").isLength({min:6}).withMessage("Please enter a valid password")
], controller.loginUser);

router.get("/profile" , authmiddleware.auth , controller.profile)
router.get("/logout" , authmiddleware.auth , controller.logoutUser);


module.exports = router;




