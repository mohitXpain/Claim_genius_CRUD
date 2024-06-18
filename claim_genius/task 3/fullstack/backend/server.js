import express from 'express';
import bodyParser from 'body-parser';
import { db } from './config/db.js'; 
import userRouters from './routes/userRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

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


app.get("/", (req, res) => {
    res.send("Welcome to the backend API");
  });
