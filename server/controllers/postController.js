import express from 'express';
import BlogPosts  from '../models/blogPostModel.js';

// Route to Add a new account
export const createPost =  async (req, res) => {

    const {userId, title, content, imageUrl} = req.body;
    
    try {
        // Create the bloog post
        const blogPost = await BlogPosts.create({ userId, title, content, imageUrl});
        res.status(201).json({ message: 'Account created successfully', blogPost });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}