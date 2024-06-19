import bcrypt from 'bcryptjs';
import connect from '../configs/connectData';
import mysql from 'mysql2/promise';
import Bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database: 'jwt',
        Promise: Bluebird,
    });

    let hashPass = hashUserPassword(password);
    try {
        const [rows, fields] = await db.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [
            email,
            hashPass,
            username,
        ]);
        return rows;
    } catch (err) {
        console.log(err);
    }
};

const getUserList = async () => {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database: 'jwt',
        Promise: Bluebird,
    });
    try {
        const [rows, fields] = await db.execute('SELECT * FROM users');
        return rows;
    } catch (err) {
        console.log(err);
    }
};

const deleUser = async (id) => {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database: 'jwt',
        Promise: Bluebird,
    });

    try {
        const [rows, fields] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    } catch (err) {
        console.log(err);
    }
};

const getUserByID = async (id) => {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database: 'jwt',
        Promise: Bluebird,
    });

    try {
        const [rows, fields] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        console.log(err);
    }
};

const updateUser = async (email, username, id) => {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database: 'jwt',
        Promise: Bluebird,
    });

    try {
        const [rows, fields] = await db.execute('UPDATE users SET email = ? , username = ? WHERE id = ?', [
            email,
            username,
            id,
        ]);
        return rows;
    } catch (err) {
        console.log(err);
    }
};
module.exports = {
    createNewUser,
    getUserList,
    deleUser,
    getUserByID,
    updateUser,
};
