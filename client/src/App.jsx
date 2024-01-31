import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/index.js";
import { SocketProvider } from "./providers/Socket.jsx";
function App() {
  return (
    <>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </SocketProvider>
    </>
  );
}

export default App;
