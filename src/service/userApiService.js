import bcrypt from 'bcryptjs';
import db from '../models/index';
import { where } from 'sequelize/lib/sequelize';

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'] },
            raw: true,
            nest: true,
        });
        if(users) {
            return {
                EM: 'success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'success',
                EC: 0,
                DT: []
            }
        }
    } catch(e) {
        console.log(e);
        return {
            EM: 'Something wrongs in services....',
            EC: 0,
            DT: []
        }
    }
}
const createNewUser = async (data) => {
    try {
        await db.User.create({

        })
    } catch(e) {
        console.log(e);
        return {
            EM: 'Something wrongs in services....',
            EC: 0,
            DT: []
        }
    }
}
const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {id: data.id}
        })
        if(user) {
            user.save({

            })
        } else {

        }
    } catch(e) {
        console.log(e);
        return {
            EM: 'Something wrongs in services....',
            EC: 0,
            DT: []
        }
    }
}
const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: {id : data.id}
        })
    } catch(e) {
        console.log(e);
        return {
            EM: 'Something wrongs in services....',
            EC: 0,
            DT: []
        }
    }
}

module.exports = { getAllUser, createNewUser, updateUser, deleteUser }