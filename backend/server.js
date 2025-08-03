const http = require("http")
const app = require("./app.js")
const PORT = process.env.PORT || 3002
const server = http.createServer(app)
const {initializeSocket} = require("./socket.js")

initializeSocket(server)

server.listen(PORT , ()=>{
    console.log(`Server has been started in this port ${PORT}`)
})
