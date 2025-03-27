require("dotenv").config()
import jwt from 'jsonwebtoken'

const createJWT = (payload) => {
    var key = process.env.JWT_SECRET
    var token

    try {
        token = jwt.sign(payload , key)
        console.log(token)
    } catch(e) {
        console.log(e)
    }
    return token
}

const verifyToken = (token) => {
    var key = process.env.JWT_SECRET
    var data = null

    try {
        var decoded = jwt.verify(token, key)
        data = decoded
    } catch(err) {
        console.log(err)
    }
    
    return data
}

module.exports = { createJWT, verifyToken }