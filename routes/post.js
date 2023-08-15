import express from "express";
const router = express.Router();

import { isAuthenticated } from "../middlewares/auth.js";

import * as controller from "../controller/post.js";

router.post("/posts", isAuthenticated , controller.createPost);

router.delete("/posts/:id", isAuthenticated, controller.deletePost);

router.post("/like/:id", isAuthenticated, controller.likePost);
router.post("/unlike/:id", isAuthenticated, controller.unlkePost);

router.post("/comment/:id", isAuthenticated, controller.addComment);

router.get("/posts/:id", isAuthenticated, controller.getPost);
router.get("/all-posts", isAuthenticated, controller.getAllPost);

export default router;