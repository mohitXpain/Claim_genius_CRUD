import express from 'express';
import { db } from '../config/db.js'; 

// Create an Express router
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


router.post("/", async (req, res) => {
    try {
      const {first_name, last_name, dob, mno, address } = req.body; 
      await db.query('INSERT INTO users (first_name, last_name, dob, mno, address) VALUES (?, ?, ?, ?, ?)',
        [first_name, last_name, dob, mno, address]
      );
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });
  

  router.delete("/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        await db.query("DELETE FROM users WHERE id = ?", [userId]);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
});


router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { first_name, last_name, dob, mno, address } = req.body;
  try {
    await db.query('UPDATE users SET first_name = ?, last_name = ?, dob = ?, mno = ?, address = ? WHERE id = ?',
      [first_name, last_name, dob, mno, address, userId]
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});


// Export the router to make it available for use in other files
export default router;
