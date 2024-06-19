import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import Bluebird from 'bluebird';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: password,
        });
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
        const [rows, fields] = await db.execute('SELECT * FROM user');
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
        const [rows, fields] = await db.execute('DELETE FROM user WHERE id = ?', [id]);
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
        const [rows, fields] = await db.execute('SELECT * FROM user WHERE id = ?', [id]);
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
        const [rows, fields] = await db.execute('UPDATE user SET email = ? , username = ? WHERE id = ?', [
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
