const Joi = require("joi");

const challengeSchema = Joi.object({
    userId: Joi.number().integer().required(),
    title: Joi.string().min(3).max(255).required(),
    startHour: Joi.string().pattern(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/).required(),
    endHour: Joi.string().pattern(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/).required(),
    status: Joi.string().valid("On Progress", "Passed", "Failed").optional()
});

module.exports = { challengeSchema };