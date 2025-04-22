const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { Op, Sequelize } = require('sequelize');

const { User } = require('../models');

class UserRepository {

    async get(id) {
        const response = await User.findByPk(id);
        if (!response) {
            throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data) {
        const response = await User.update(data, {
            where: {
                id: id
            }
        });

        if ((Array.isArray(response) === true) && (response[0] === 0)) {
            throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
        }

        return response;
    }

    async getAll() {
        const response = await User.findAll();
        return response;
    }

    async findAll(userId, name) {
        const users = await User.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                },
                id: { [Op.ne]: userId }
            },
            attributes: ['id', 'name', 'email'],
        });

        if (users.length === 0) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }

        return users;
    }
}

module.exports = UserRepository;