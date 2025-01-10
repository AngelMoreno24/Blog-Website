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


// Function to adjust time by hours
const adjustTime = (timeString, hours) => {
  const date = new Date(timeString); // Convert the string to a Date object
  date.setHours(date.getHours() + hours); // Add or subtract hours
  return date.toISOString(); // Convert back to ISO string format
};

// Route to Add a new account
export const getAllPost =  async (req, res) => {

  
  try {
      // Create the bloog post
      const blogPosts = await BlogPosts.findAll({
        order: [['createdAt', 'DESC']]
      });

      // Adjust timestamps by -7 hours (UTC to UTC-7 for Phoenix time)
      const adjustedBlogPosts = blogPosts.map(post => {
        return {
          ...post.toJSON(), // Convert Sequelize instance to plain JSON object
          createdAt: adjustTime(post.createdAt, -7),
          updatedAt: adjustTime(post.updatedAt, -7),
        };
      });

      res.status(200).json({ message: 'Blog posts fetched successfully', blogPosts: adjustedBlogPosts });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}