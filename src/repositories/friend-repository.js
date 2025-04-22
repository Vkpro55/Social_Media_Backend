const { Friendship, User } = require('../models');
const { Op, Sequelize } = require('sequelize');

const { REQUEST_RESPONSE_STATUS } = require('../utils/common/enums');
const { PENDING } = REQUEST_RESPONSE_STATUS;

class FriendRepository {
    async sendFriendRequest(senderId, receiverId) {
        return await Friendship.create({
            senderId,
            receiverId,
            status: PENDING
        });
    }

    async alreadyRequested(senderId, receiverId) {
        return await Friendship.findOne({
            where: {
                senderId,
                receiverId
            }
        });
    }

    async getRequest(senderId, receiverId) {
        return await Friendship.findOne({
            where: {
                senderId,
                receiverId,
                status: PENDING
            }
        });
    }

    async updateRequestStatus(friendship, status) {
        friendship.status = status;
        await friendship.save();
        return friendship;
    }

    async fetchAcceptedFriends(userId) {
        const friendships = await Friendship.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ],
                status: 'accepted'
            },
            include: [
                {
                    model: User,
                    as: 'Sender',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'Receiver',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        /*==  Return only the "other" user in the friendship ==*/
        const friends = friendships.map((f) => {
            if (f.senderId === userId) {
                return f.Receiver;  // ✅ capitalized
            } else {
                return f.Sender;    // ✅ capitalized
            }
        });

        return friends;
    }

    async findAll(excludeIds) {
        const suggestions = await User.findAll({
            where: {
                id: { [Op.notIn]: excludeIds }
            },
            attributes: ['id', 'name', 'email'],
            order: [[Sequelize.fn('RAND')]],
            limit: 5
        });

        return suggestions;
    }
}

module.exports = FriendRepository;
