import mysql from 'mysql2/promise';

interface DB {
    host: string;
    user: string;
    password: string;
    database: string;
}

const DATAbase: DB = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
};

const db = mysql.createPool(DATAbase);

export {db};