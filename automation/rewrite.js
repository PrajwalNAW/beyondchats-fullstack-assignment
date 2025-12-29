import "dotenv/config";
import axios from "axios";
import { googleSearch } from "./googleSearch.js";
import { scrapeContent } from "./scraper.js";
import { rewriteArticleWithGemini } from "./gemini.js";

const API_URL = process.env.BACKEND_API || "http://localhost:5000/api/articles";

async function run() {
  console.log("🚀 Automation started...");

  const { data: articles } = await axios.get(API_URL);
  console.log(`📄 Articles fetched: ${articles.length}`);

  let processed = 0;

  for (const article of articles) {
    if (article.isRewritten) {
      console.log(`⏭ Skipping (already rewritten): ${article.title}`);
      continue;
    }

    console.log(`✍️ Rewriting: ${article.title}`);

    const links = await googleSearch(article.title);

   let finalLinks = links;

if (links.length < 2) {
  console.log("⚠️ Search engine blocked. Using fallback references.");

  finalLinks = [
    "https://towardsdatascience.com/",
    "https://medium.com/tag/artificial-intelligence"
  ];
}

const ref1 = await scrapeContent(finalLinks[0]);
const ref2 = await scrapeContent(finalLinks[1]);


    const rewrittenContent = await rewriteArticleWithGemini(
      article.content,
      ref1,
      ref2
    );

    await axios.post(API_URL, {
      title: `${article.title} (Enhanced)`,
      content: rewrittenContent,
      references: links,
      isRewritten: true
    });

    console.log(`✅ Published rewritten article`);
    processed++;
  }

  console.log(`🎉 Automation finished. Articles processed: ${processed}`);
}

run().catch(err => {
  console.error("❌ Automation failed:", err.message);
});
