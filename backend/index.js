require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const app = require("./app");
const { connectToDatabase } = require("./config/db");
const natural = require("natural");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`GiftLink API running on port ${PORT}`));
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
}

start();
