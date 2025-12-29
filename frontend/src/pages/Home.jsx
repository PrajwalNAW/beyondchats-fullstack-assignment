import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articlesApi";
import ArticleList from "../components/ArticleList";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
  fetchArticles().then(data => {
    console.log("ARTICLES:", data);
    setArticles(data);
  });
}, []);


  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Articles Overview
        </h2>

        <ArticleList articles={articles} />
      </section>
    </main>
  );
}
