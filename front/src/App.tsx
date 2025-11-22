import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Channels from "./pages/Channels";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/chat/:channelId" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
