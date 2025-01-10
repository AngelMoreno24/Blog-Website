import express from 'express';
import { createPost, getAllPost, getOnePost, getUserPosts} from "../controllers/postController.js";
import { verifyToken } from "../middleware/tokenVerification.js"
const router = express.Router();

router.post("/create", verifyToken, createPost);

router.post("/getAll", verifyToken, getAllPost);

router.post("/getOne", verifyToken, getOnePost);

router.post("/getUser", verifyToken, getUserPosts);


export default router;