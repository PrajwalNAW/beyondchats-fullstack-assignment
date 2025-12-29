// automation/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function rewriteArticleWithGemini(original, ref1, ref2) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro"
  });

  const prompt = `
You are a professional content editor.

TASK:
Rewrite the original article to be high-quality, well-structured, and professional.

RULES:
- Improve clarity and flow
- Add headings and subheadings
- Do NOT plagiarize
- Keep original meaning
- If reference content is missing, rely on your general knowledge
- End with a "References" section (even if generic)

ORIGINAL ARTICLE:
${original}

REFERENCE ARTICLE 1:
${ref1 || "No reference content available"}

REFERENCE ARTICLE 2:
${ref2 || "No reference content available"}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
