const db = require('../models');
const Boom = require('@hapi/boom');

const Challenges = db.challenges;

const ChallengeController = {
    async createChallenge(request, h) {
        try {
            const { userId, title, startHour, endHour, status } = request.payload;

            const challenge = await Challenges.create({ userId, title, startHour, endHour, status });

            return h.response({
                ...challenge.toJSON(),
                status: "success",
            }).code(201);
        } catch (error) {
            console.error(error);
            return Boom.internal(error.message);
        }
    },

    async getChallengesByUser(request, h) {
        try {
            const { userId } = request.params;

            const challenges = await Challenges.findAll({ where: { userId } });

            if (challenges.length === 0) {
                return Boom.notFound("No challenges found for this user");
            }

            return h.response({
                challenges,
                status: "success",
            }).code(200);
        } catch (error) {
            console.error(error);
            return Boom.internal(error.message);
        }
    },

    async updateChallenge(request, h) {
        try {
            const { id } = request.params;
            const { title, startHour, endHour, status } = request.payload;

            const challenge = await Challenges.findByPk(id);

            if (!challenge) {
                return Boom.notFound("Challenge not found");
            }

            await challenge.update({ title, startHour, endHour, status });

            return h.response({
                ...challenge.toJSON(),
                status: "success",
            }).code(200);
        } catch (error) {
            console.error(error);
            return Boom.internal(error.message);
        }
    },

    async deleteChallenge(request, h) {
        try {
            const { id } = request.params;

            const challenge = await Challenges.findByPk(id);

            if (!challenge) {
                return Boom.notFound("Challenge not found");
            }

            await challenge.destroy();

            return h.response({
                message: "Challenge deleted successfully",
                status: "success",
            }).code(200);
        } catch (error) {
            console.error(error);
            return Boom.internal(error.message);
        }
    },
};

module.exports = ChallengeController;