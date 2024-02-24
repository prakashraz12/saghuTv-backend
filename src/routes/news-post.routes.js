import { Router } from "express";

import { authUser } from "../middleware/auth.middleware.js";
import { createNews } from "../controllers/news.controller.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";

const router = Router();

//routes to create news
router.post("/create", authUser, authorizationUser(["admin", "editor"]), createNews);

//routes to edit news
router.put("/update/:id", authUser, authorizationUser(["admin", "editor"]), createNews);

//routes to delete news
router.put("/update/:id", authUser, authorizationUser(["admin", "editor"]), createNews);


export default router;
