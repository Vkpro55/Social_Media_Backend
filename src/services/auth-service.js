const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const Auth = require('../utils/helper/auth');
const { AuthRepository, RoleRepository } = require('../repositories');

const { Enums } = require("../utils/common");
const { ADMIN } = Enums.USER_ROLES;

const authRepository = new AuthRepository();
const roleRepostory = new RoleRepository();

async function signup(data) {
    try {
        const user = await authRepository.create(data);

        const role = await roleRepostory.getRoleByName(ADMIN);
        user.addRole(role);

        return user;
    } catch (error) {
        console.log("Error is :", error);
        if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Cannot create a new User object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function login(data) {
    try {
        const user = await authRepository.getUserByEmail(data.email);
        if (!user) {
            throw new AppError("No user is found for given email", StatusCodes.NOT_FOUND);
        }

        const passwordMatch = Auth.comparePassword(data.password, user.password);

        if (!passwordMatch) {
            throw new AppError("Invalid Password", StatusCodes.BAD_REQUEST);
        }

        const jwt = Auth.createToken({ id: user.id, email: user.email });

        return jwt;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    signup,
    login
}