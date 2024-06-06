import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './config/db.js'; // Assuming this imports your database connection
import userRouters from './routes/userRoutes.js';

const app = express();
const port = 3000;

// Cross-origin resource sharing - frontend can make requests to backend servers
app.use(cors());
// Middleware to parse incoming requests
app.use(bodyParser.json());

// Use the user routes
app.use("/users", userRouters);

// Test the database connection and start the server
(async () => {
  try {
    // Test the database connection
    await db.query("SELECT 1");
    console.log("MySQL database connected successfully");
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();

// Define a route handler for the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the backend API");
  });
