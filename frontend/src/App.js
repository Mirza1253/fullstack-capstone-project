import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { getGifts } from "./services/api";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getGifts().then(setItems).catch(console.error);
  }, []);

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">GIFT • RECYCLE • REUSE</p>
        <h1>Give things a second life.</h1>
        <p>GiftLink connects people giving away useful household items with people who want free, reusable things.</p>
        <Link className="button" to="/register">Get Started</Link>
      </section>

      <section>
        <h2>Available items</h2>
        <div className="grid">
          {items.map(item => (
            <article className="card" key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>{item.category} · {item.location}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">GiftLink</Link>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
