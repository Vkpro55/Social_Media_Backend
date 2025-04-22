const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const Auth = require('../utils/helper/auth');
const { UserRepository } = require('../repositories');

const userRepository = new UserRepository();

async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }

        const response = Auth.verifyToken(token);

        const user = await userRepository.get(response.id);

        if (!user) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }

        return user.id;
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }

        console.log("Error is :", error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getProfile(id) {
    try {
        const user = await userRepository.get(id);
        return user;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The airplne you requested is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of an airplane", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateProfile(id, data) {
    try {
        const response = await userRepository.update(id, data);
        return response;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The user you requested to update is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of a user you requested to update", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUsers(id) {
    try {
        const loggedUser = await userRepository.get(id);
        const allusers = await userRepository.getAll();

        const users = allusers.filter((user) => user.email !== loggedUser.email);
        return users;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    isAuthenticated,
    getProfile,
    updateProfile,
    getUsers
}