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

const editProfileSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    age: Joi.number().min(1).max(120).optional(),
    gender: Joi.string().valid('Male', 'Female').optional(),
    photo: Joi.any().optional(),
});

module.exports = { editProfileSchema };


module.exports = {registerSchema, loginSchema, editProfileSchema};