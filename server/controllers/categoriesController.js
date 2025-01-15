import Categories  from '../models/categoriesModel.js';

// Route to Add a new account
export const createCategory =  async (req, res) => {

    const { name, description } = req.body;
    
    const userId = req.account.id;
    try {
      
      const exists = await Categories.findOne(
          { where: { name: name } } // Replace with the post ID
      );
        if(exists){
          return res.status(409).json({ message: 'Category already exists' });
        }


        await Categories.create({ name, description});
        res.status(201).json({ message: 'Category added successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}
 
export const deleteCategory = async (req, res) => {

    const { id } = req.body;
   
    try {
      
        const Category = await Categories.findOne(
          { where: { id: id } } // Replace with the post ID
        );

        if(!Category){
          return res.status(400).json({message: "could not find Category"})
        }

        await Category.destroy();

        res.status(201).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Route to Add a new account
export const getCategories =  async (req, res) => {

    
    try {
      

      const category = await Categories.findAll();
      res.status(200).json({ message: 'category fetched successfully', category });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  }