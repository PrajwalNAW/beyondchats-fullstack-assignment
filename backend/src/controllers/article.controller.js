// src/controllers/article.controller.js
import Article from "../models/Article.js";

export const createArticle = async (req, res) => {
  const article = await Article.create(req.body);
  res.status(201).json(article);
};

export const getArticles = async (_, res) => {
  res.json(await Article.find().sort({ createdAt: -1 }));
};

export const getArticle = async (req, res) => {
  res.json(await Article.findById(req.params.id));
};

export const updateArticle = async (req, res) => {
  res.json(await Article.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
