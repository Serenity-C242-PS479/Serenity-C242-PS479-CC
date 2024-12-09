const db = require('../models')
const Boom = require('@hapi/boom')
const Auth = require('../helper/AuthenticationHelper')

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

require('dotenv').config();

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'c242-ps479',
  });
const bucket = storage.bucket('serenity_storage');

const saltRounds = 10;

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

            const isValidPassword = await Auth.comparePassword(password, user.password);

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
    },
    async editProfile(request, h) {
        try {
            const { id } = request.params;
            const { name, email, password, age, gender } = request.payload;
    
            // Cek apakah user ada
            const user = await Users.findByPk(id);
            if (!user) {
                return Boom.notFound("User not found");
            }
    
            // Hash password jika diubah
            let hashedPassword = user.password;
            if (password) {
                hashedPassword = await bcrypt.hash(password, saltRounds);
            }
    
            let photoPath = user.photo_profile;
            if (request.payload.photo) {
                const file = request.payload.photo;
                const fileName = `images/users/user-${id}-${Date.now()}-${file.hapi.filename}`;  // Menyimpan di folder images/users/
    
                // Upload gambar ke Google Cloud Storage
                const blob = bucket.file(fileName);
                const blobStream = blob.createWriteStream({
                    resumable: false,
                    contentType: file.hapi.headers['content-type'],
                });
    
                // Menggunakan Promise untuk menunggu hingga proses upload selesai
                await new Promise((resolve, reject) => {
                    file.pipe(blobStream)
                        .on('finish', resolve) // Sukses
                        .on('error', reject); // Gagal
                });
    
                // Foto berhasil diupload
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    
                // Update path gambar di database
                await user.update({
                    name: name || user.name,
                    email: email || user.email,
                    password: hashedPassword,
                    age: age || user.age,
                    gender: gender || user.gender,
                    photo_profile: publicUrl,
                });
    
                return h.response({
                    status: "success",
                    message: "Profile updated successfully",
                    data: {
                        user_id: user.id,
                        name: user.name,
                        email: user.email,
                        age: user.age,
                        gender: user.gender,
                        photo_profile: publicUrl,
                    },
                }).code(200);
            } else {
                // Jika tidak ada gambar yang diupload, hanya update data lainnya
                await user.update({
                    name: name || user.name,
                    email: email || user.email,
                    password: hashedPassword,
                    age: age || user.age,
                    gender: gender || user.gender,
                });
    
                return h.response({
                    status: "success",
                    message: "Profile updated successfully",
                    data: {
                        user_id: user.id,
                        name: user.name,
                        email: user.email,
                        age: user.age,
                        gender: user.gender,
                        photo_profile: user.photo_profile,
                    },
                }).code(200);
            }
        } catch (error) {
            console.error(error);
            return Boom.internal(error.message);
        }
    }
};

module.exports = AuthController;