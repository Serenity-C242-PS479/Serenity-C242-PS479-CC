const db = require('../models')
const Boom = require('@hapi/boom')
const Auth = require('../helper/AuthenticationHelper')

const Users = db.users;

const AuthController = {
    async register(request, h){
        try {
            const { name, email, password, age, gender } = request.payload;
    
            const isUserExist = await Users.findOne({ where: { email: email } });
            if (isUserExist) {
                return Boom.badRequest("User already registered");
            } else {
                const user = await Users.create({ name, email, password, age, gender });
                
                return h.response({
                    data: {
                        user_id: user.id,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        age: user.age,
                        gender: user.gender,
                        photo_profile: user.photo_profile
                    },
                    status: "success",
                }).code(201);
            }
        }
        catch (error) {
            return Boom.internal(error.message);
        }
    },
    async login(request, h){
        try {
            const {email, password} = request.payload;

            const user = await Users.findOne({where: {email: email}});

            if(!user){
                return Boom.notFound("User Not Found");
            }

            const isValidPassword = Auth.comparePassword(password, user.password);

            if(!isValidPassword){
                return Boom.badRequest("Invalid username or password");
            }

            const payload = {id: user.id, name: user.name};
            const accessToken = Auth.generateAccessToken(payload);
            const refreshToken = Auth.generateRefreshToken(payload);

            return h.response({
                data: {
                    user_id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    age: user.age,
                    gender: user.gender,
                    photo_profile: user.photo_profile
                },
                accessToken,
                refreshToken,
                status: "success",
            }).code(200);
        }
        catch(error){
            console.log(error);

            return Boom.internal(error.message);
        }
    },
    async refreshAccessToken(request, h){
        try {
            const { refreshToken } = request.payload;

            const decoded = Auth.verifyRefreshToken(refreshToken);

            const newAccessToken = Auth.generateAccessToken({ id: decoded.id, name: decoded.name });

            return h.response({
                status: "success",
                accessToken: newAccessToken
            }).code(200);
        } catch (error) {
            console.error(error);
            return Boom.unauthorized("Invalid or expired refresh token");
        }
    },
    async getProfile(request, h){
        try {
            const { id } = request.params;
            const user = await Users.findByPk(id);

            if (!user) {
                return Boom.notFound("User not found");
            }

            return h.response({
                status: "success",
                data: {
                    user_id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    age: user.age,
                    gender: user.gender,
                    photo_profile: user.photo_profile
                },
            }).code(200);
        } catch (error) {
            console.error(error);
            return Boom.internal(error.message);
        }
    }
};

module.exports = AuthController;