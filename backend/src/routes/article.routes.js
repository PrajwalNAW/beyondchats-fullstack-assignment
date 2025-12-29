import express from "express";
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} from "../controllers/article.controller.js";

const router = express.Router();

router.post("/", createArticle);
router.get("/", getArticles);
router.get("/:id", getArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
