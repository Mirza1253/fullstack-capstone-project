const { MongoClient } = require("mongodb");

let client;
let db;

async function connectToDatabase() {
  if (db) return db;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not configured");
  }

  client = new MongoClient(uri);
  await client.connect();

  db = client.db();
  console.log("MongoDB connected");
  return db;
}

function getDatabase() {
  if (!db) throw new Error("Database has not been connected yet");
  return db;
}

module.exports = { connectToDatabase, getDatabase };
