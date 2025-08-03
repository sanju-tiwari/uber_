const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/auth.middleware.js")
const {query} = require("express-validator")
const { getcoordinate, getDistanceTime, getautosuggesstion } = require("../controller/maps.controller.js")


router.get("/get-coordinate",
    query("address").isString().isLength({min: 3})
    , authmiddleware.auth ,getcoordinate )

router.get("/get-distance-time",
    query("origin").isString().isLength({min:3 }),
     query("destination").isString().isLength({min:3 })
    ,authmiddleware.auth , getDistanceTime   )

router.get("/auto-suggestion", 
     query("input").isString().isLength({min:3})
    ,authmiddleware.auth ,getautosuggesstion)    



module.exports = router