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
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getProfile(id) {
    try {
        const user = await userRepository.get(id);
        return user;
    } catch (error) {
        if (error instanceof AppError) {
            throw new AppError('User is not present', StatusCodes.NOT_FOUND);
        }

        throw new AppError('Something went wrong in the server', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    isAuthenticated,
    getProfile
}