// db.js
import mysql from 'mysql2/promise';

// Create the connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud'
});

export { db };
