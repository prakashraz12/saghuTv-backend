import { Router } from "express";

import { authUser } from "../middleware/auth.middleware.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";
import {
  createAd,
  deleteAd,
  getAdsByPosition,
  getAllAds,
  multipleAdsGet,
  updateAd,
} from "../controllers/ads.controller.js";

const router = Router();

//routes to create ads
router.post("/create", authUser, authorizationUser(["admin"]), createAd);

//routes to edit news
router.put("/update", authUser, authorizationUser(["admin"]), updateAd);

// //routes to delete ads
// router.delete("/update/:id", authUser, authorizationUser(["admin"]), deleteAd);

//routes to get list of category
router.get("/getAll", getAllAds);

//routes to delete ads
router.delete("/delete/:id", authUser, authorizationUser(["admin"]), deleteAd);

//routes to getAdsByPosition
router.get("/get-by-position", getAdsByPosition);

//routes to get ads by posiotion of array
router.post("/get/ads", multipleAdsGet);

export default router;
