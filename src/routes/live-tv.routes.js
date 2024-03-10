import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { authorizationUser } from "../middleware/authorization.middleware.js";
import { createLiveTv, deleteLiveTv, getAllLiveTv, getLiveTvById, updateLiveTv } from "../controllers/live-tv.controller.js";


const router = Router();

//routes to create-live tv
router.post("/create", authUser, authorizationUser(["admin"]), createLiveTv);

//routes to update live tv

router.put("/update", authUser, authorizationUser(["admin"]), updateLiveTv);

//routes to getAllLive tv
router.get("/get-all", authUser, authorizationUser(["admin"]), getAllLiveTv );

//routes to delete live tv
router.delete("/delete/:id", authUser, authorizationUser(["admin"]), deleteLiveTv );

//roputer to get live-tv by id;
router.get("/get/:id", authUser, authorizationUser(["admin"]), getLiveTvById );





export default router;
