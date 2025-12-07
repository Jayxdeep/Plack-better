import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

interface IChannel {
  _id: string;
  name: string;
}

export default function Channels() {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [newChannel, setNewChannel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadChannels(token);
  }, [navigate]);

  const loadChannels = async (token: string) => {
    try {
      const res = await api.get<IChannel[]>("/channels", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChannels(res.data);
    } catch (err) {
      console.error("Error loading channels:", err);
    }
  };

  const handleCreateChannel = async () => {
    const token = localStorage.getItem("token");
    if (!newChannel.trim()) return;

    try {
      await api.post(
        "/channels",
        { name: newChannel },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewChannel("");
      loadChannels(token!); // Refresh channel list
    } catch (err) {
      console.error("Failed to create channel:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Channels</h2>

      <button onClick={logout} style={{ marginBottom: "15px" }}>
        Logout
      </button>

      <div>
        <input
          placeholder="Create new channel"
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
        />
        <button onClick={handleCreateChannel}>+</button>
      </div>

      <br />

      {channels.length === 0 && <p>No channels found yet.</p>}

      {channels.map((ch) => (
        <div
          key={ch._id}
          style={{
            padding: "10px",
            border: "1px solid gray",
            marginBottom: "10px",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={() => navigate(`/chat/${ch._id}`)}
        >
          # {ch.name}
        </div>
      ))}
    </div>
  );
}
