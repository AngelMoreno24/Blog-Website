import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Import

const BlogPosts = sequelize.define('BlogPosts', 
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts', // This must match the table name for the Account model
        key: 'id',
      },
      onDelete: 'CASCADE', // Automatically delete posts if the user is deleted
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false, // Title is required
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Content is required
    },
    imageUrl: {
      type: DataTypes.TEXT, // Optional field for image URL
      allowNull: true, // Can be null if no image is provided
    },
  }, {
    timestamps: true, 
  }
);

export default BlogPosts;