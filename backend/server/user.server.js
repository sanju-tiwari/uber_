const usermodel = require("../models/user.model.js")

module.exports.createuser = async({
  firstname , lastname , email , password
})=>{
   if(!firstname || !lastname || !email || !password){
       throw new Error("All fields are required");
   }
    const user = usermodel.create({
        fullName: {
            firstname,
            lastname
        },
        email,
        password
    }).then((user)=>{
        return user;
    }).catch((err)=>{
        throw new Error("Error creating user: " + err.message);
    })

   return user;
}

