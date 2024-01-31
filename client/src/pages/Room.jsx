import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../providers/Socket.jsx";

function Room() {
  const params = useParams();
  const { socket } = useSocket();
    console.log("Params: ", params);
    const handlerNewJoinedUser = (data) => {
        const { email } = data
        console.log("New User Joined: ", email);
    }
    useEffect(() => {
        try {
            if (!socket) {
                console.log("No socket");
                return;
            }
            socket.on("user-joined",handlerNewJoinedUser)
        } catch (error) {
            console.log("Error while joining room", error);
        }
    })
  return (
    <div>
      <h1>This is Room : {params.roomCode} </h1>
    </div>
  );
}

export default Room;
