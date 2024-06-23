const bcrypt = require('bcrypt');
const { SALT ,  SECRET_KEY} = require('../constants');
const jwt = require("jsonwebtoken")

async function encryptPassword(password) {
    try {
        if (!password) return;
        const hashedPassword = await bcrypt.hash(password, SALT);
        return hashedPassword;
    }
    catch (err) {
        throw err;
    }
}


async function generateToken(payload) {
    try {
        const token = await jwt.sign(payload, SECRET_KEY ,{ expiresIn:'1h' });
        return token;
    }
    catch (err) {
        throw err;
    }
}


async function verifyPassword(hashPass, pass) {
    try {
        if (!hashPass || !pass) {
            throw 'Verify passwords are required';
        }
        const validate = await bcrypt.compare(pass, hashPass);
        return validate;
    }
    catch (err) {
        throw err;
    }
}


async function verifyToken(token) {
    try {
        if ( ! token ) throw 'Token is null';
        const verifyToken = await jwt.verify(token ,  SECRET_KEY);
        return verifyToken;
    }
    catch(err) {
        throw err;
    }
}




module.exports = {
    encryptPassword,
    generateToken,
    verifyPassword,
    verifyToken
}
