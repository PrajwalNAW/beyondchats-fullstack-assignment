import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  if (!articles || articles.length === 0) {
    return <p className="text-gray-400">No articles found.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {articles.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
