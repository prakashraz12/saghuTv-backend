import { Router } from "express";
import {
    changePassword,
  createUser,
  getAllUsers,
  loginUser,
  updateUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";

const router = Router();

//routes to create user
router.post("/create", authUser, authorizationUser(["admin"]), createUser);

//routes to login user
router.post("/login", loginUser);

//routes to update user
router.put("/update/:id", authUser, updateUser);


//routes to change password
router.patch("/change-password", authUser, changePassword);

//routes to get all user list
router.get("/get-all-users", authUser, authorizationUser(["admin"]), getAllUsers);

export default router;
