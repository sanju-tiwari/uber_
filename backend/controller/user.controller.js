const usermodels = require("../models/user.model.js")
const {validationResult} = require("express-validator")
const BlacklistTokenModel = require("../models/BlacklistToken.model.js")
const userServer = require("../server/user.server.js")

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName , email, password } = req.body;
    
  try {
    const hashedpassword = await usermodels.hashpassword(password);
    const verifyemail = await usermodels.findOne({email})
        if(verifyemail){
            return res.status(400).json({
                message:"Email already exists"
            })
        }

   const user = await userServer.createuser({
      firstname:fullName.firstname,
      lastname:fullName.lastname,
      email,
      password: hashedpassword
    });
    
    if (!user) {
      return res.status(400).json({ errors: "User registration failed" });
    }
    const token = user.generateAuthToken();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      },
      token
    });
    
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ errors: "Internal server error" });
  }
  
}
module.exports.loginUser = async(req , res)=>{
     const errors = validationResult(req)
     if(!errors.isEmpty()){
        res.status(400).json({
            errors:errors.array()
        })
     }
     const {email , password} = req.body
     try {
        
        const verifyemail = await usermodels.findOne({email}).select("+password")
        if(!verifyemail){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const isMatch = await verifyemail.matchPassword(password)   
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const token = verifyemail.generateAuthToken()

   
          res.cookie("token", token, )


        res.status(200).json({
            message:"User logged in successfully",
            user:{
                id:verifyemail._id,
                fullName:verifyemail.fullName,
                email:verifyemail.email
            },
            token
        })

     } catch (error) {
        console.log(error.message)
        res.status(401).json({
            message:"internal server error"
        })
     }


}
module.exports.profile = async(req , res , next )=>{
    try {
        const user = req.user;
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({
            user: {
                
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports.logoutUser = async(req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    try {
        await BlacklistTokenModel.create({ token }); 
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


