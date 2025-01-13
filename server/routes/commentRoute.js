import express from 'express';
import { createComment, getPostComments, editComment, deleteComment } from "../controllers/commentController.js";
import { verifyToken } from "../middleware/tokenVerification.js"
const router = express.Router();

router.post("/create", verifyToken, createComment);

router.post("/getAllComment", verifyToken, getPostComments);

router.post("/edit", verifyToken, editComment);

router.delete("/delete", verifyToken, deleteComment);

export default router;