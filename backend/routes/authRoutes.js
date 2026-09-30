const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectToDatabase } = require("../config/db");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

function makeToken(user) {
  return jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    const db = await connectToDatabase();
    const existing = await db.collection("users").findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = {
      name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date()
    };

    const result = await db.collection("users").insertOne(user);
    const saved = { ...user, _id: result.insertedId };
    delete saved.passwordHash;

    res.status(201).json({ user: saved, token: makeToken(saved) });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email: (email || "").toLowerCase() });

    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const safeUser = { _id: user._id, name: user.name, email: user.email };
    res.json({ user: safeUser, token: makeToken(safeUser) });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

router.put("/profile", authRequired, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email.toLowerCase();

    await db.collection("users").updateOne(
      { _id: require("mongodb").ObjectId.createFromHexString(req.user.id) },
      { $set: updates }
    );

    res.json({ message: "Profile updated", updates });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed", error: err.message });
  }
});

module.exports = router;
