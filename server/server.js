import mysql from "mysql";
import express from 'express';
import cors from 'cors';
import Sequelize from'sequelize';
import dotenv from "dotenv";
import accountRoute from "./routes/accountRoute.js";
import blogPostRoute from "./routes/blogPostRoute.js";
import commentRoute from "./routes/commentRoute.js";
import likeRoute from "./routes/likeRoute.js";
import categoriesRoute from "./routes/categoriesRoute.js";


dotenv.config();




const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//refactor paths
app.use('/accounts', accountRoute);
app.use('/blogPosts', blogPostRoute);
app.use('/comments', commentRoute);
app.use('/likes', likeRoute);
app.use('/categories', categoriesRoute);


const port = process.env.PORT || 5000;
// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Create a new instance of Sequelize for MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Disable SQL logging in the console
    timezone: '-07:00', // Fixed offset for Phoenix (UTC-7) year-round
    
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