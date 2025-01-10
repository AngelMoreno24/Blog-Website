import express from 'express';
import { createPost, getAllPost} from "../controllers/postController.js";
import { verifyToken } from "../middleware/tokenVerification.js"
const router = express.Router();

router.post("/create", verifyToken, createPost);

router.post("/getAll", verifyToken, getAllPost);


export default router;