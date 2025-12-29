export function normalizeText(text = "") {
  if (!text) return "";

  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/(\d)([a-zA-Z])/g, "$1 $2")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

export function splitIntoParagraphs(text, maxSentences = 2) {
  if (!text) return [];

  const sentences =
    text.match(/[^.!?]+[.!?]+/g) || [text];

  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += maxSentences) {
    paragraphs.push(sentences.slice(i, i + maxSentences).join(" "));
  }

  return paragraphs;
}
