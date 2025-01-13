import express from 'express';
import Likes  from '../models/likeModel.js';

// Route to Add a new account
export const createLike =  async (req, res) => {

    const { postId } = req.body;
    
    const userId = req.account.id;
    try {
      
        await Likes.create({ postId, userId});
        res.status(201).json({ message: 'Like added successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}
 
export const deleteLike = async (req, res) => {

    const { id } = req.body;
   
    try {
        
            
        
        const like = await Likes.findOne(
            { where: { id: id } } // Replace with the post ID
        );

        if(!like){
            res.status(400).json({message: "could not find like"})
        }

        await like.destroy();

        res.status(201).json({ message: 'like deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Route to Add a new account
export const getPostLikes =  async (req, res) => {

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