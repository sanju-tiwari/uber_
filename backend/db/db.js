const mongoose = require('mongoose');

function connectToDatabase() {
    
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/uber';

    mongoose.connect(url).then(()=>{
        console.log("Connected to MongoDB successfully");
    }).catch((err)=>{
        console.log("Error connecting to MongoDB:", err);
    })
}
module.exports = connectToDatabase;