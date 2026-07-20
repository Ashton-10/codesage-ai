import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      console.log("Email:", email);
      console.log("Password:", password);

      const form = new URLSearchParams();
      form.append("username", email);
      form.append("password", password);

      const response = await api.post(
        "/auth/login",
        form,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("SUCCESS:", response.data);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);

        alert(err.response.data.detail || "Login failed");
      } else {
        alert("Cannot connect to backend");
      }
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "100px auto",
        textAlign: "center",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>CodeSage AI</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={login}
        style={{
          width: "100%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <br />
      <br />

      <Link to="/register">Create Account</Link>
    </div>
  );
}

export default Login;