const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const connectToDatabase = require("./db/db.js")
const userrouter = require("./routers/user.router.js")
const captionrouters = require("./routers/caption.router.js")
const maprouters = require("./routers/maps.router.js")
const riderouter = require("./routers/ride.router.js")
connectToDatabase()


const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/" , (req , res)=>{
    res.send("hello")
})
app.use("/user" , userrouter )
app.use("/caption" , captionrouters)
app.use("/maps" , maprouters )
app.use("/rider" , riderouter)

module.exports = app