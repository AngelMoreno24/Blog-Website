import express from 'express';
import { createComment, getPostComments } from "../controllers/commentController.js";
import { verifyToken } from "../middleware/tokenVerification.js"
const router = express.Router();

router.post("/create", verifyToken, createComment);

router.post("/getAllComment", verifyToken, getPostComments);


export default router;