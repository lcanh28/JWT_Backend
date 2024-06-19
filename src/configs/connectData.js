import mysql from 'mysql2/promise';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'jwt',
});

export default db;
