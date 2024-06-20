import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import Bluebird from 'bluebird';
import db from '../models/index';
import { where } from 'sequelize/lib/sequelize';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    await db.User.create({
        username: username,
        email: email,
        password: hashPass,
    });
};

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
    // try {
    //     const [rows, fields] = await db.execute('SELECT * FROM user');
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    // }
};

const deleUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId },
    });
    // try {
    //     const [rows, fields] = await db.execute('DELETE FROM user WHERE id = ?', [id]);
    // } catch (err) {
    //     console.log(err);
    // }
};

const getUserByID = async (id) => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM user WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        console.log(err);
    }
};

const updateUser = async (email, username, id) => {
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
