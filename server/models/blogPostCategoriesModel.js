import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Import

const blogPostCategories = sequelize.define('blogPostCategories', 
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlogPost', // This must match the table name for the Account model
        key: 'id',
      },
      onDelete: 'CASCADE', // Automatically delete posts if the user is deleted
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts', // This must match the table name for the Account model
        key: 'id',
      },
      onDelete: 'CASCADE', // Automatically delete posts if the user is deleted
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Content is required
    },
  }, {
    timestamps: true, 
  }
);

export default blogPostCategories;