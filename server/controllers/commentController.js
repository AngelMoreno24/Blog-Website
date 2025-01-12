import express from 'express';
import Comments  from '../models/commentModel.js';

// Route to Add a new account
export const createComment =  async (req, res) => {

    const { postId, content} = req.body;
    
    const userId = req.account.id;
    try {
      
        // Create the bloog post
        const comment = await Comments.create({ postId, userId, content});
        res.status(201).json({ message: 'Comment created successfully', comment });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

export const editComment = async (req, res) => {

  const { id, content } = req.body;

  const userId = req.account.id;
  try {
    
         
    
      const comment = await Comments.findOne(
        { where: { id: id } } // Replace with the post ID
      );

      if(!comment){
        res.status(400).json({message: "could not find comment"})
      }
      
        
      comment.content = content;
        


      await comment.save();



      res.status(201).json({ message: 'Comment created successfully', comment });
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
export const getPostComments =  async (req, res) => {

  const { postId } = req.body;
  
  try {
      // Create the bloog post
      const comments = await Comments.findAll({
        where: {postId:postId},
        order: [['createdAt', 'DESC']]
      });

      // Adjust timestamps by -7 hours (UTC to UTC-7 for Phoenix time)
      const adjustedComments = comments.map(post => {
        return {
          ...post.toJSON(), // Convert Sequelize instance to plain JSON object
          createdAt: adjustTime(post.createdAt, -7),
          updatedAt: adjustTime(post.updatedAt, -7),
        };
      });

      res.status(200).json({ message: 'Blog posts fetched successfully', comments: adjustedComments });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}