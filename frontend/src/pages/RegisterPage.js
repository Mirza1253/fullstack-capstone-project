import React, { useState } from "react";
import { register } from "../services/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await register(form);
      localStorage.setItem("token", data.token);
      setMessage("Registration successful.");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create account</h2>
      <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
      <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}
