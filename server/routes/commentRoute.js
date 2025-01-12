import express from 'express';
import { createComment, getPostComments, editComment } from "../controllers/commentController.js";
import { verifyToken } from "../middleware/tokenVerification.js"
const router = express.Router();

router.post("/create", verifyToken, createComment);

router.post("/getAllComment", verifyToken, getPostComments);

router.post("/edit", verifyToken, editComment);

export default router;