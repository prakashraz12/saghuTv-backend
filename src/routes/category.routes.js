import { Router } from "express";

import { authUser } from "../middleware/auth.middleware.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";
import { createCategory, deleteCategory, getListOfCategory, updateCategory } from "../controllers/category.controller.js";

const router = Router();

//routes to create news
router.post("/create", authUser, authorizationUser(["admin"]), createCategory);

//routes to edit news
router.put("/update", authUser, authorizationUser(["admin"]), updateCategory);

//routes to delete news
router.delete("/update/:id", authUser, authorizationUser(["admin"]), deleteCategory);

//routes to get list of category
router.get("/getAll", getListOfCategory);

//routes to delete category
router.delete("/delete/:id", authUser, authorizationUser(["admin"]), deleteCategory)


export default router;
