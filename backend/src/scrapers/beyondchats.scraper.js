import axios from "axios";
import * as cheerio from "cheerio";
import Article from "../models/Article.js";

const BLOG_URL = "https://beyondchats.com/blogs/";

export async function scrapeOldestArticles() {
  console.log("🔍 Fetching blog list...");

  const { data } = await axios.get(BLOG_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "text/html"
    }
  });

  const $ = cheerio.load(data);

  const articlesMap = new Map();

  // 1️⃣ Collect all blog links
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().trim();

    if (
      href &&
      href.startsWith("https://beyondchats.com/blogs/") &&
      href.split("/").length > 4 &&   // avoid /blogs/ only
      text.length > 15                // avoid nav links
    ) {
      articlesMap.set(href, text);
    }
  });

  const articles = Array.from(articlesMap.entries()).map(
    ([url, title]) => ({ url, title })
  );

  if (articles.length === 0) {
    throw new Error("No blog articles detected — site structure may have changed");
  }

  // 2️⃣ Take last 5 = oldest
  const oldestArticles = articles.slice(-5);

  console.log(`📄 Found ${oldestArticles.length} oldest articles`);

  // 3️⃣ Visit each article page
  for (const article of oldestArticles) {
    const articlePage = await axios.get(article.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    const $$ = cheerio.load(articlePage.data);

    const content =
      $$("article").text().trim() ||
      $$("main").text().trim() ||
      $$("body").text().trim();

    if (!content || content.length < 200) {
      console.log(`⚠️ Skipping short content: ${article.title}`);
      continue;
    }

    await Article.create({
      title: article.title,
      content,
      author: "BeyondChats",
      publishedDate: new Date(),
      url: article.url,
      isRewritten: false
    });

    console.log(`✅ Saved: ${article.title}`);
  }
}
