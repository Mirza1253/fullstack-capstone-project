import React, { useState } from "react";
import { login } from "../services/api";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login(form);
      localStorage.setItem("token", data.token);
      setMessage("Login successful.");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}
