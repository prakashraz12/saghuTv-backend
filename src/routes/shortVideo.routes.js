import { Router } from "express";
import { adminDashBoard } from "../controllers/dashboard.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";
import {
  createShortVideo,
  deleteShortVideo,
  getAllShortVideos,
} from "../controllers/short-video.controller.js";

const router = Router();

//routes to getdasboard data
router.post(
  "/create",
  authUser,
  authorizationUser(["admin"]),
  createShortVideo
);
// router.post("/update/:id", authUser, authorizationUser(["admin"]), short);

//'routes to get all
router.get(
  "/get-all",
  authUser,
  authorizationUser(["admin"]),
  getAllShortVideos
);

//routes to delete video;
router.delete(
  "/delete/:id",
  authUser,
  authorizationUser(["admin"]),
  deleteShortVideo
);

export default router;
