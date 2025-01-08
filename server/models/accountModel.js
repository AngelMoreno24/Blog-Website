const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the Sequelize connection

  const Account = sequelize.define('Account', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20], 
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        isEmail: true, 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [8, 100], 
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user', 
      validate: {
        isIn: [['user', 'admin']],
      },
    },
  }, {
    timestamps: true, 
  });

module.exports = Account;
