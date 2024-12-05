const AuthController = require('./controllers/AuthController');
const ChallengeController = require('./controllers/ChallengeController');

const AuthValidator = require('./validators/AuthValidator');

const routes = [
    // Root Route
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {
          return h.response({
            status: 'success',
            message: 'Test Root Route'
          }).code(200);
        },
        options: {
            auth: false
        }
    },

    // User Route
    {
        method: 'POST',
        path: '/api/v1/register',
        handler: AuthController.register,
        options: {
            auth: false,
            validate: {
                payload: AuthValidator.registerSchema
            }
        }
    },
    {
        method: 'POST',
        path: '/api/v1/login',
        handler: AuthController.login,
        options: {
            auth: false,
            validate: {
                payload: AuthValidator.loginSchema
            }
        }
    },
    {
        method: 'POST',
        path: '/api/v1/refresh',
        options: { auth: false },
        handler: AuthController.refreshAccessToken
    },
    {
        method: 'GET',
        path: '/api/v1/profile/{id}',
        handler: AuthController.getProfile
    },    
    {
        method: 'GET',
        path: '/api/v1/home',
        handler: async(request, h) => {
            return h.response({
                status: 'success',
                message: 'Home Test'
            }).code(200);
        }
    },

    // Challenge Route
    {
        method: 'POST',
        path: '/api/v1/{user_id}/challenges',
        handler: ChallengeController.createChallenge,
    },
    {
        method: 'GET',
        path: '/api/v1/{user_id}/challenges/',
        handler: ChallengeController.getChallengesByUser,
    },
    {
        method: 'PUT',
        path: '/api/v1/{user_id}/challenges/{id}',
        handler: ChallengeController.updateChallenge,
    },
    {
        method: 'DELETE',
        path: '/api/v1/{user_id}/challenges/{id}',
        handler: ChallengeController.deleteChallenge,
    },

    // 404 Not Found Route
    {
        method: 'GET',
        path: '/{any*}',
        handler: (request, h) => {
            return h.response({
                status: 'failed',
                message: '404 Not Found!'
            }).code(404);
        },
        options: {
            auth: false
        }
    }
];

module.exports = {
    name: 'routes',
    version: '1.0.0',
    register: async (server, options) => {
        server.route(routes);
    }
}