import { useState } from "react";
import { api } from "../api/client";
import { socket } from "../socket/socket";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await api.post("/auth/login", { email, password });
    const data = res.data as any;
    
    localStorage.setItem("token", data.token);

    socket.auth = { token: data.token };
    socket.connect();

    window.location.href = "/channels";
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
