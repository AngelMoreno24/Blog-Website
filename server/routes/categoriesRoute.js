import express from 'express';
import { createCategory, getCategories, deleteCategory } from "../controllers/categoriesController.js";
import { verifyToken } from "../middleware/tokenVerification.js"
const router = express.Router();

router.post("/create", verifyToken, createCategory);

router.post("/getCategories", verifyToken, getCategories);

router.delete("/delete", verifyToken, deleteCategory);


export default router;