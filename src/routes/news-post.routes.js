import { Router } from "express";

import { authUser } from "../middleware/auth.middleware.js";
import { createNews, deleteNews, getAllNews,  getProvinceNews, getProvinceNewsByProvinceNumber, updateNews } from "../controllers/news.controller.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";

const router = Router();

//routes to create news
router.post("/create", authUser, authorizationUser(["admin", "editor"]), createNews);

//routes to edit news
router.put("/update/:id", authUser, authorizationUser(["admin", "editor"]), updateNews);

//routes to delete news
router.put("/update/:id", authUser, authorizationUser(["admin", "editor"]), createNews);

//router to get all news
router.get("/get-all-news", authUser, authorizationUser(['admin']), getAllNews);

//routes to delete news 
router.delete("/delete/:id", authUser, authorizationUser(['admin', 'editor']), deleteNews);

// routes to get province news;
router.get("/province", getProvinceNews);

//routes to get province news by province number;
router.get("/provinceByNumber", getProvinceNewsByProvinceNumber)


export default router;
