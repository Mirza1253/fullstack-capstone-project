const express = require("express");
const { connectToDatabase } = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { category, q } = req.query;
    const filter = {};

    if (category) filter.category = category;

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ];
    }

    const results = await db.collection("items").find(filter).sort({ createdAt: -1 }).toArray();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});

module.exports = router;
