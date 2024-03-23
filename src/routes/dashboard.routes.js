import { Router } from "express";
import { adminDashBoard } from "../controllers/dashboard.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";
import {
  createSiteSettings,
  getSiteSeetings,
  getSiteSettingsById,
  siteSettingsUpdate,
} from "../controllers/site-settings.controller.js";

const router = Router();

//routes to getdasboard data
router.get("/", authUser, authorizationUser(["admin"]), adminDashBoard);

//routes to create site settings
router.post(
  "/site/create",
  authUser,
  authorizationUser(["admin"]),
  createSiteSettings
);

//routes to update site settings

router.put(
  "/site/update",
  authUser,
  authorizationUser(["admin"]),
  siteSettingsUpdate
);
router.get("/site/:id", getSiteSettingsById);
//routes to get siteSettings
router.get("/site", getSiteSeetings);

export default router;
