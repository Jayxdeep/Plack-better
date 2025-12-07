import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { api } from "../api/client";
import { useParams, useNavigate } from "react-router-dom";

interface IMessage {
  _id?: string;
  channelId: string;
  userId: string;
  text: string;
  createdAt?: string;
}

export default function Chat() {
  const { channelId } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  // Load messages + socket
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!channelId) return;

    loadMessages(token);

    socket.emit("join_channel", channelId);

    socket.on("new_message", (msg: IMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [channelId, navigate]);

  const loadMessages = async (token: string) => {
    try {
      const res = await api.get<IMessage[]>(`/messages/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages(res.data);
    } catch (err) {
      console.log("Error loading messages:", err);
    }
  };

  // Send socket message
  const sendMessage = () => {
    const userId = localStorage.getItem("userId");
    if (!text.trim() || !userId) return;

    socket.emit("send_message", {
      channelId,
      userId,
      text,
    });

    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>

      <div style={{ marginBottom: 20 }}>
        {messages.length === 0 && <p>No messages yet...</p>}

        {messages.map((msg) => (
          <div key={msg._id} style={{ marginBottom: 8 }}>
            <strong>{msg.userId}: </strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>

      <br /><br />

      <button onClick={() => navigate("/channels")}>Back to channels</button>
    </div>
  );
}