import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeContent(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "text/html"
      },
      timeout: 15000
    });

    const $ = cheerio.load(data);

    const text =
      $("article").text().trim() ||
      $("main").text().trim() ||
      $("body").text().trim();

    return text.slice(0, 4000); // limit size
  } catch (error) {
    console.log(`⚠️ Could not scrape ${url} (${error.response?.status})`);
    return ""; // <-- CRITICAL: DO NOT THROW
  }
}
