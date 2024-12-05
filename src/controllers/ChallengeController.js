const db = require('../models');
const Boom = require('@hapi/boom');

const Challenges = db.challenges;

const ChallengeController = {
    async createChallenge(request, h) {
        try {
            const { user_id, title, start_hour, end_hour, status } = request.payload;

            const challenge = await Challenges.create({ user_id, title, start_hour, end_hour, status });

            return h.response({
                status: "success",
            }).code(201);
        } catch (error) {
            console.error(error);
            return Boom.internal(error.message);
        }
    },

    async getChallengesByUser(request, h) {
        try {
            const { user_id } = request.params;

            const challenges = await Challenges.findAll({ where: { user_id } });

            if (challenges.length === 0) {
                return Boom.notFound("No challenges found for this user");
            }

            return h.response({
                datas: challenges,
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
            const { title, start_hour, end_hour, status } = request.payload;

            const challenge = await Challenges.findByPk(id);

            if (!challenge) {
                return Boom.notFound("Challenge not found");
            }

            await challenge.update({ title, start_hour, end_hour, status });

            return h.response({
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
                status: "success",
            }).code(200);
        } catch (error) {
            console.error(error);
            return Boom.internal(error.message);
        }
    },
};

module.exports = ChallengeController;