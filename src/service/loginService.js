require('dotenv').config()
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { getGroupWithRoles } from './JWTService'
import { createJWT } from '../middleware/JWTAction'


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

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

const registerNewUser = async (rawUserData) => {
    //check email, phone, username, password are exist
    try {
        //check email is exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist) {
            return {
                EM: 'The email is already exist',
                EC: 1,
            };
        }
        //check phone is exist
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist) {
            return {
                EM: 'The phone number is already exist',
                EC: 1,
            };
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 5
        });
        return {
            EM: 'User is created successfully',
            EC: 0,
        };
    } catch (e) {
        return {
            EM: 'Something wrongs in service....',
            EC: -2,
        };
    }
};

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
};

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [{ email: rawData.accountLogin }, { phone: rawData.accountLogin }],
            },
        });

        if (user) {
            console.log('>> Found user with email/phone');
            //check password is exist
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles: groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload)
                return {
                    EM: 'Login successful',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles
                    }
                };
            }
        }
        return {
            EM: 'Your email/phone number or password is incorrect',
            EC: 1,
            DT: '',
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrongs in service....',
            EC: -2,
        };
    }
};

module.exports = {
    registerNewUser,
    handleUserLogin,
};
