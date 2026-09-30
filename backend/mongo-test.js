require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

console.log("Testing MongoDB connection...");

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000
});

async function test() {
  try {
    await client.connect();
    console.log("SUCCESS: MongoDB connected!");
  } catch (err) {
    console.error("FAILED:", err.message);
  } finally {
    await client.close();
  }
}

test();
