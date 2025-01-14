import express from 'express';
import Likes  from '../models/likeModel.js';

// Route to Add a new account
export const createLike =  async (req, res) => {

    const { postId } = req.body;
    
    const userId = req.account.id;
    try {
      
      const exists = await Likes.findOne(
          { where: { userId: userId } } // Replace with the post ID
      );
        if(exists){
          return res.status(409).json({ message: 'You have already liked this post' });
        }


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

    const { postId } = req.body;
    
    try {
    
      

      // Create the bloog post
      const likeCount = await Likes.count({
        where: { postId:postId },
        
      });
      

      if(!likeCount){
        res.status(400).json({message: "could not find like"})
      }

      res.status(200).json({ message: 'Blog posts fetched successfully', likeCount });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  }