import { Router } from "express";

import { authUser } from "../middleware/auth.middleware.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";
import { createMenu, deleteMenu, updateMenu } from "../controllers/menu.controller.js";

const router = Router();

//routes to create news
router.post("/create", authUser, authorizationUser(["admin"]), createMenu);

//routes to edit news
router.put("/update", authUser, authorizationUser(["admin"]), updateMenu);

//routes to delete news
router.delete("/update/:id", authUser, authorizationUser(["admin"]), deleteMenu);


export default router;
