import express from 'express';
import BlogPosts  from '../models/blogPostModel.js';

// Route to Add a new account
export const createPost =  async (req, res, next) => {

    const { title, content, imageUrl, category} = req.body;
    
    const userId = req.account.id;
    try {
        // Create the bloog post
        const blogPost = await BlogPosts.create({ userId, title, content, imageUrl});

        req.blogPostId = blogPost.id;
        req.category = category;

        next();

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


// Route to Add a new account
export const getOnePost =  async (req, res) => {

  const { id } = req.body;
  
  try {
      // Create the bloog post
      const blogPosts = await BlogPosts.findAll({
        where: {id:id}
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


// Route to Add a new account
export const getUserPosts =  async (req, res) => {

  const { userId } = req.body;
  
  try {
      // Create the bloog post
      const blogPosts = await BlogPosts.findAll({
        where: {userId:userId},
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

// Route to Add a new account
export const editPost =  async (req, res) => {
 
  
  const { id, title, content, imageUrl} = req.body;
    
  const currentId = req.account.id;
  
  console.log("user attempting edit"+ currentId);

  try {
    
      const post = await BlogPosts.findOne(
        { where: { id: id } } // Replace with the post ID
      );

      if(!post){
        res.status(400).json({message: "could not find post"})
      }
      if(title){
        post.title = title;
      }

      if(content){
        post.content = content;
      }


      if(imageUrl){
        post.imageUrl = imageUrl;
      }



      await post.save();


      res.status(200).json({ message: 'Blog posts fetched successfully'});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}

// Route to Add a new account
export const deletePost =  async (req, res) => {
 
  
  const { id } = req.body;
    
  const currentId = req.account.id;
  
  console.log("user attempting edit"+ currentId);

  try {
    
      const post = await BlogPosts.findOne(
        { where: { id: id } } // Replace with the post ID
      );

      if(!post){
        return res.status(400).json({message: "could not find post"})
      }
      
         
      await post.destroy();

      res.status(201).json({ message: 'Blog posts deleted successfully' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}