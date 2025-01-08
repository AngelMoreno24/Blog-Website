const mysql = require("mysql");
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Sequelize = require('sequelize'); // Import Sequelize


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Create a new instance of Sequelize for MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Disable SQL logging in the console
  });

  const PORT = process.env.PORT || 5000;

sequelize
    .authenticate() // Test the connection to the database
    .then(() => {
        console.log('Database connected successfully');
        sequelize.sync({ alter: true }); // Sync models with database (creates tables if not exist)

        // Start the server after database connection is established
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });