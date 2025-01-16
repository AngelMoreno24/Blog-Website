import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Import

const BlogPostCategories = sequelize.define('BlogPostCategories', 
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlogPost', 
        key: 'id',
      },
      onDelete: 'CASCADE', 
    },
    categoryId: {
      type: DataTypes.INTEGER,  
      allowNull: false,
      references: {
        model: 'Categories', 
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: false, 
  }
);

export default BlogPostCategories;