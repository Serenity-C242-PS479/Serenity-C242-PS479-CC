const Joi = require("joi").extend(require('@joi/date'));

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().min(1).max(120).required(),
    gender: Joi.string().valid('Male', 'Female').required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

module.exports = {registerSchema, loginSchema};