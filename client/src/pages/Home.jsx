import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useSocket } from "../providers/Socket.jsx";

function Home() {
  const [email, setEmail] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const { socket } = useSocket();

  const handlerForm = (e) => {
    try {
      e.preventDefault();
      console.log("Email: ", email);
      console.log("Room Code: ", roomCode);
      if (!socket) {
        console.log("No socket");
        return;
      }
      console.log("Socket In Handler: ", socket.connect());
      socket.emit("join-room", { roomCode, email });
    } catch (error) {
      console.log("Error while joining room", error);
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {});
    } else {
      console.log("No socket");
    }
    return () => {
      socket.disconnect();
    };
  });

  return (
    <div>
      <h1>Zohu Club</h1>
      <form onSubmit={handlerForm}>
        <div>
          <TextField
            id="outlined-basic"
            label="Email"
            type="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => {
              return setEmail(e.target.value);
            }}
            placeholder="Please enter your email address"
          />
          <TextField
            id="outlined-basic"
            label="Room Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={roomCode}
            onChange={(e) => {
              return setRoomCode(e.target.value);
            }}
            placeholder="Please enter room code"
          />

          <Button variant="contained" type="submit" color="primary">
            Join Room
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Home;
