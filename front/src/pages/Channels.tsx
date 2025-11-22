import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { api } from "../api/client";
import { useParams } from "react-router-dom";


interface IMessage {
  _id?: string;
  channelId: string;
  userId: string;
  text: string;
  createdAt?: string;
}

export default function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadMessages();

    socket.on("new_message", (msg: IMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [id]);

  const loadMessages = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get(`/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setMessages(res.data as IMessage[]);
  };

  const sendMessage = () => {
    const userId = localStorage.getItem("userId");

    socket.emit("send_message", {
      channelId: id,
      userId,
      text,
    });

    setText("");
  };

  return (
    <div>
      <h2>Chat</h2>

      {messages.map((msg) => (
        <div key={msg._id}>{msg.text}</div>
      ))}

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
