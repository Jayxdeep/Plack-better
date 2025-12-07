import { useEffect, useState } from "react";
import { api } from "../api/client";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";
interface LoginResponse {
  _id: string;
  email: string;
  token: string;
}
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/channels");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      const res = await api.post<LoginResponse>("/auth/login", { email, password });
      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);

      socket.auth = { token: data.token };
      socket.connect();

      navigate("/channels");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={handleLogin}>Login</button>

      {message && <p style={{ color: "red" }}>{message}</p>}

      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
}
