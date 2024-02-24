import { Router } from "express";
import { getAllNews, getHighlightedNews, getNewsBycategory, searchNews } from "../controllers/public.controller.js";

const router = Router();

//routes to getAllNews
router.get("/getNews", getAllNews);

//routes to get highlighted news 
router.get("/getHighlighted", getHighlightedNews)

//routes to search news
router.get("/search", searchNews);

//routes to get news by id
router.get('/search-category', getNewsBycategory)
export default router;
