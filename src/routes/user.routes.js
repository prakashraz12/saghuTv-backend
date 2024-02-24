import { Router } from "express";
import {
    changePassword,
  createUser,
  loginUser,
  updateUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

//routes to create user
router.post("/create", createUser);

//routes to login user
router.post("/login", loginUser);

//routes to update user
router.put("/update/:id", authUser, updateUser);


//routes to change password
router.patch("/change-password", authUser, changePassword)

export default router;
