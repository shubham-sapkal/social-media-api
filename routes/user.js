import express from "express";
const router = express.Router();

import * as controller from "../controller/user.js"
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/authenticate", controller.login);
router.post("/register", controller.register);

router.get("/user", isAuthenticated, controller.getProfile);

router.post("/follow/:id", isAuthenticated, controller.follow);
router.post("/unfollow/:id", isAuthenticated, controller.unfollow);

export default router;