import axios from "axios";
import * as cheerio from "cheerio";

export async function googleSearch(query) {
  const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(
    query + " blog"
  )}&ia=web`;

  const { data } = await axios.get(searchUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "text/html"
    },
    timeout: 15000
  });

  const $ = cheerio.load(data);
  const links = new Set();

  // Strategy 1: Standard result links
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");

    if (
      href &&
      href.startsWith("http") &&
      !href.includes("duckduckgo.com") &&
      !href.includes("google.com")
    ) {
      links.add(href);
    }
  });

  return Array.from(links).slice(0, 2);
}
