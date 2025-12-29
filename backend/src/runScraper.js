import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { scrapeOldestArticles } from "./scrapers/beyondchats.scraper.js";

dotenv.config();

async function run() {
  await connectDB();
  console.log("🚀 Starting BeyondChats scraping...");

  await scrapeOldestArticles();

  console.log("✅ Scraping completed");
  process.exit(0);
}

run().catch(err => {
  console.error("❌ Scraping failed:", err);
  process.exit(1);
});
