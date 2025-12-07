import { useState } from "react";
import { register } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await register(username, email, password);
      console.log(res.data);
      setMessage("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create an Account</h2>

      <form onSubmit={handleRegister}>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br/><br/>

        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/><br/>

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}

      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
