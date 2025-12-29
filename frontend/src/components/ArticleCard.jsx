import { normalizeText, splitIntoParagraphs } from "../utils/textFormatter";

export default function ArticleCard({ article }) {
  const cleaned = normalizeText(article.content || "");
  const paragraphs = splitIntoParagraphs(cleaned, 2).slice(0, 4);

  return (
    <article className="bg-white rounded-lg px-6 py-6 shadow-sm border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {normalizeText(article.title)}
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        By <span className="font-medium">{article.author || "Unknown"}</span>
      </p>

      <div className="space-y-3 text-base text-gray-700 leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            article.isRewritten
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {article.isRewritten ? "Rewritten" : "Original"}
        </span>

        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Read Source →
          </a>
        )}
      </div>
    </article>
  );
}
