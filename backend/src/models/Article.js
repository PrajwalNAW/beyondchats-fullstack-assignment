// src/models/Article.js
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  publishedDate: Date,
  url: String,
  isRewritten: { type: Boolean, default: false },
  references: [String]
}, { timestamps: true });

export default mongoose.model("Article", ArticleSchema);
