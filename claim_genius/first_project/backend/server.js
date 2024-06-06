// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

// Cross-Origin Resource Sharing
app.use(cors())
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL connected');
});



app.post('/', (req, res) => {
  const { first_name, last_name, dob, mno, address } = req.body;
  const sql = 'INSERT INTO users (first_name, last_name, dob, mno, address) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [first_name, last_name, dob, mno, address], (err, result) => {
      if (err) throw err;
    res.send('User added!');
  });
});

// Read all users
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

app.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});

app.listen(7000)