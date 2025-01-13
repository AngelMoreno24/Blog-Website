import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Import

const Likes = sequelize.define('Likes', 
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts', // This must match the table name for the Account model
        key: 'id',
      },
      onDelete: 'CASCADE', // Automatically delete posts if the user is deleted
    },
  }, {
    timestamps: true, 
  }
);

export default Likes;