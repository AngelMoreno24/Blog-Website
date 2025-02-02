import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Import

const Categories = sequelize.define('Categories', 
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false, // Title is required
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false, // Content is required
    },
  }, {
    timestamps: false, 
  }
);

export default Categories;