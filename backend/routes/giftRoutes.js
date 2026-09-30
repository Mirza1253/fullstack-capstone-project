const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../config/db");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection("items").find({}).sort({ createdAt: -1 }).toArray();
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: "Unable to load gifts", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid item id" });
    }
    const db = await connectToDatabase();
    const gift = await db.collection("items").findOne({ _id: new ObjectId(req.params.id) });
    if (!gift) return res.status(404).json({ message: "Item not found" });
    res.json(gift);
  } catch (err) {
    res.status(500).json({ message: "Unable to load item", error: err.message });
  }
});

router.post("/", authRequired, async (req, res) => {
  try {
    const { title, description, category, location, imageUrl } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "title and category are required" });
    }

    const db = await connectToDatabase();
    const item = {
      title,
      description: description || "",
      category,
      location: location || "",
      imageUrl: imageUrl || "",
      ownerId: req.user.id,
      createdAt: new Date()
    };

    const result = await db.collection("items").insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Unable to create item", error: err.message });
  }
});

router.put("/:id", authRequired, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid item id" });
    }

    const db = await connectToDatabase();
    const result = await db.collection("items").updateOne(
      { _id: new ObjectId(req.params.id), ownerId: req.user.id },
      { $set: { ...req.body, updatedAt: new Date() } }
    );

    if (!result.matchedCount) return res.status(404).json({ message: "Item not found or not owned by user" });
    res.json({ message: "Item updated" });
  } catch (err) {
    res.status(500).json({ message: "Unable to update item", error: err.message });
  }
});

router.delete("/:id", authRequired, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid item id" });
    }

    const db = await connectToDatabase();
    const result = await db.collection("items").deleteOne({
      _id: new ObjectId(req.params.id),
      ownerId: req.user.id
    });

    if (!result.deletedCount) return res.status(404).json({ message: "Item not found or not owned by user" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete item", error: err.message });
  }
});

module.exports = router;
