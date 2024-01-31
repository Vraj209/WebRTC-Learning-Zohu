const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { cors } = require("cors");
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(bodyParser.json());

const emailToSocketMapping = new Map();


io.on("connection", (socket) => {
  console.log("New connection");
  socket.on("join-room", (data) => {
    const { roomCode, email } = data;
    console.log("Getting Data in Backend: ");
    console.log(`User email : ${email} joined room : ${roomCode}.`);
  
    emailToSocketMapping.set(email, socket.id);
    console.log("emailToSocketMapping: ", emailToSocketMapping);
    socket.join(roomCode);
    socket.emit("joined-room", {roomCode})
    socket.broadcast.to(roomCode).emit("user-joined", () => {
      console.log("user-joined", email);
    });
  });

  socket.on("disconnect", () => {
    console.log(`User(${socket.id}) Disconnected`);
  });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

const appPort = 8000;

server.listen(appPort, () => {
  console.log(`App Server is running on port ${appPort}.`);
});
