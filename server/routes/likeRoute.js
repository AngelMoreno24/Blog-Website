import express from 'express';
import { createLike, getPostLikes, deleteLike } from "../controllers/likeController.js";
import { verifyToken } from "../middleware/tokenVerification.js"
const router = express.Router();

router.post("/create", verifyToken, createLike);

router.post("/getPostLikes", verifyToken, getPostLikes);

router.delete("/delete", verifyToken, deleteLike);


export default router;