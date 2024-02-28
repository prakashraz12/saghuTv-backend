import { Router } from "express";
import {
  getAllNews,
  getHighlightedNews,
  getNewsById,
  getNewsBycategory,
  searchNews,
} from "../controllers/public.controller.js";

const router = Router();

//routes to getAllNews
router.get("/getNews", getAllNews);

//routes to get highlighted news
router.get("/getHighlighted", getHighlightedNews);

//routes to search news
router.get("/search", searchNews);

//routes to get news by category
router.get("/search-category", getNewsBycategory);

//routes to get news by id
router.get("/news/:id", getNewsById);

export default router;
