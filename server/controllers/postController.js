import express from 'express';
import BlogPosts  from '../models/blogPostModel.js';

// Route to Add a new account
export const createPost =  async (req, res) => {

    const { title, content, imageUrl} = req.body;
    
    const userId = req.account.id;
    try {
        // Create the bloog post
        const blogPost = await BlogPosts.create({ userId, title, content, imageUrl});
        res.status(201).json({ message: 'Blog post created successfully', blogPost });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}