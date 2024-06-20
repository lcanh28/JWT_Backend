import bcrypt from 'bcryptjs';
import db from '../models/index';

//connect data basic

// import mysql from 'mysql2/promise';
// import Bluebird from 'bluebird';
// const db = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456789',
//     database: 'jwt',
//     Promise: Bluebird,
// });

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
};

const deleUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId },
    });
};

const getUserByID = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id },
    });
    return user.get({ plain: true });
};

const updateUser = async (email, username, id) => {
    await db.User.update({ email: email, username: username }, { where: { id: id } });
};
module.exports = {
    createNewUser,
    getUserList,
    deleUser,
    getUserByID,
    updateUser,
};
