const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { ServerConfig } = require('../../config');

function comparePassword(plainPassword, encryptPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptPassword);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function createToken(input) {
    try {
        return jwt.sign(input, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    comparePassword,
    createToken,
    verifyToken
}