import { Router } from "express";
import { adminDashBoard } from "../controllers/dashboard.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";


const router = Router();

//routes to getdasboard data
router.get("/", authUser, authorizationUser(["admin"]), adminDashBoard)



export default router;
