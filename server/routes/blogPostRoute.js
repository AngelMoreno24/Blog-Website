import express from 'express';
import { createPost } from "../controllers/postController.js";
//import { verifyToken} from "../middleware/validateToken.js"
const router = express.Router();

router.post("/create", createPost);



export default router;