require("dotenv").config()
import jwt from 'jsonwebtoken'

const nonSecurePaths = ['/', '/register', '/login']

const createJWT = (payload) => {
    var key = process.env.JWT_SECRET
    var token

    try {
        token = jwt.sign(payload , key, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        // console.log(token)
    } catch(e) {
        console.log(e)
    }
    return token
}

const verifyToken = (token) => {
    var key = process.env.JWT_SECRET
    var decoded = null

    try {
        decoded = jwt.verify(token, key)
    } catch(err) {
        console.log(err)
    }
    return decoded
}

const checkUserJWT = (req, res, next) => {
    if(nonSecurePaths.includes(req.path)) return next()
    let cookie = req.cookies
    if(cookie && cookie.jwt) {
        let token = cookie.jwt
        let decoded = verifyToken(token)
        console.log(decoded)
        if(decoded) {
            req.user = decoded
            req.token = token
            next()
        } else {
            return res.status(401).json({
                EC: '-1',
                DT: '',
                EM: 'Not authenticated the user'
            })
        }
    } else {
        return res.status(401).json({
            EC: '-1',
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if(nonSecurePaths.includes(req.path) || req.path === '/account') return next()
    if(req.user) {
        let email = req.user.email
        let roles = req.user.groupWithRoles.Roles
        let currentURL = req.path

        if(!roles || roles.length === 0) {
            return res.status(403).json({
                EC: '-1',
                DT: '',
                EM: 'You don`t have permission to access this resource!!!'
            })
        }
        let canAccess = roles.some(item => item.url === currentURL)
        if(canAccess === true) {
            next()
        } else {
            return res.status(403).json({
                EC: '-1',
                DT: '',
                EM: 'You don`t have permission to access this resource!!!'
            })
        }      
    } else {
        return res.status(401).json({
            EC: '-1',
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}

module.exports = { createJWT, verifyToken, checkUserJWT, checkUserPermission }