import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({path: './src/.env'});

interface DB {
    host?: string;
    user?: string;
    password?: string;
    database?: string;
}

const DATAbase: DB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};


const db = mysql.createPool(DATAbase);

export { db };
