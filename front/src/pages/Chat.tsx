import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connectSocket } from "../socket/socket";

export default function Chat() {
  const { channelId } = useParams();

  useEffect(() => {
    const socket = connectSocket();

    socket.emit("join_channel", channelId);

    socket.on("new_message", (msg: any) => {
      console.log("received:", msg);
    });

    return () => {
      socket.off("new_message");
      socket.disconnect();
    };
  }, [channelId]);

  return <div>Chat</div>;
}
