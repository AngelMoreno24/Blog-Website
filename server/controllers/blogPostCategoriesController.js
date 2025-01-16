import BlogPostCategories  from '../models/blogPostCategoriesModel.js';
import Categories  from '../models/categoriesModel.js';

// Route to Add a new account
export const createBlogPostCategories =  async (req, res) => {
 
    
    const postId = req.blogPostId;
    const name = req.category;
    try {
        
        const exists = await Categories.findOne(
            { where: { name: name } } // Replace with the post ID
        );
        if(!exists){
          return res.status(409).json({ message: 'Category does not exist' });
        }


        await BlogPostCategories.create({ postId, categoryId: exists.id});
        res.status(201).json({ message: 'post added successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
 
}
 
export const deleteBlogPostCategories = async (req, res) => {

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
export const getBlogPostCategories =  async (req, res) => {

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



