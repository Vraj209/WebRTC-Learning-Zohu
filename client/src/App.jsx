import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Room } from "./pages/index.js";
import { SocketProvider } from "./providers/Socket.jsx";
function App() {
  return (
    <>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </SocketProvider>
    </>
  );
}

export default App;
