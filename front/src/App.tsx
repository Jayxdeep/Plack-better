import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Channels from "./pages/Channels";
import Chat from "./pages/Chat.old";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/chat/:channelId" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
