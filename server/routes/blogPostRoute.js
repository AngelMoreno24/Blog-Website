import express from 'express';
import { createPost, getAllPost, getOnePost, getUserPosts, editPost, deletePost } from "../controllers/postController.js";

import { createBlogPostCategories, deleteBlogPostCategories, getBlogPostCategories } from "../controllers/blogPostCategoriesController.js";

import { verifyToken } from "../middleware/tokenVerification.js"
const router = express.Router();

router.post("/create", verifyToken, createPost, createBlogPostCategories);

router.post("/getAll", verifyToken, getAllPost);

router.post("/getOne", verifyToken, getOnePost);

router.post("/getUser", verifyToken, getUserPosts);

router.post("/edit", verifyToken, editPost);

router.delete("/delete", verifyToken, deletePost);


export default router;