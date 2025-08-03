const SocketIO = require("socket.io");
const captionmodel = require("./models/caption.model.js");
const usermodel = require("./models/user.model.js");

let io; 
const initializeSocket = (server) => {
  io = SocketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userID, userType } = data;
      try {
        if (userType === "user") {
          await usermodel.findByIdAndUpdate(userID, { SocketId: socket.id });
        } else if (userType === "caption") {
          await captionmodel.findByIdAndUpdate(userID, { SocketId: socket.id });
        }
      } catch (err) {
        console.error("Error updating socket ID in DB:", err);
      }

      socket.on("update-location-caption" , async (data)=>{
          const {userID , location} = data
          if(!location || !location.ltd || !location.lng){
           return  socket.emit("error" , {message:"invaild location error"})
          }
          await captionmodel.findByIdAndUpdate(userID ,{location:{
           type: "Point",
           coordinates: [location.lng, location.ltd]
        }})
      })
      
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  });
};

const sendmessagetosocket = (SocketId, message) => {
  if (io) {
    console.log(`sendmessage id ${SocketId} or ${message.data}`)
    io.to(SocketId).emit(message.event , message.data);
  } else {
    console.log("Socket.IO is not initialized.");
  }
};

module.exports = {
  initializeSocket,
  sendmessagetosocket
};
