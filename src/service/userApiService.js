import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

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
                EM: 'Success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'No users',
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
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'] },
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
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail },
    });

    if (user) {
        return true;
    }
    return false;
};

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone },
    });

    if (user) {
        return true;
    }
    return false;
};
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};
const createNewUser = async (data) => {
    try {
        //check email is exist
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist) {
            return {
                EM: 'The email is already exist',
                EC: 1,
                DT: []
            };
        }
        //check phone is exist
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist) {
            return {
                EM: 'The phone number is already exist',
                EC: 1,
                DT: []
            };
        }
        //hash user password
        let hashPassword = hashUserPassword(data.password);

        //create new user
        await db.User.create({...data, password: hashPassword});
        return {
            EM: 'User is created successfully',
            EC: 0,
            DT: []
        };
    } catch (e) {
        return {
            EM: 'Something wrongs in service....',
            EC: -2,
            DT: []
        };
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
        let user = await db.User.findOne({
            where: {id : id}
        })
        if(user) {
            await user.destroy();
            return {
                EM: 'Delete user success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User not exist',
                EC: 2,
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

module.exports = { getAllUser, createNewUser, updateUser, deleteUser, getUsersWithPagination }