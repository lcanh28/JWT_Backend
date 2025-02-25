import bcrypt from 'bcryptjs';
import db from '../models/index';

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
            EC: 1,
            DT: []
        }
    }
}
const getUsersWithPagination = async (page, limit) => {
    try{
        let offset = (page - 1) * limit

        const {count, rows} = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
        })
        let totalPages = Math.ceil(count/limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'success',
            EC: 0,
            DT: data, //data
        };
    }catch(e){
        console.log(e);
        return {
            EM: 'Something wrongs in services....',
            EC: 1,
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
            EC: 1,
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
            EC: 1,
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
            EC: 1,
            DT: []
        }
    }
}

module.exports = { getAllUser, createNewUser, updateUser, deleteUser, getUsersWithPagination }