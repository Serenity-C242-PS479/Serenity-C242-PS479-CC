const AuthController = require('./controllers/AuthController');

const AuthValidator = require('./validators/AuthValidator');

const routes = [
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
        path: '/api/v1/home',
        handler: async(request, h) => {
            return h.response({
                status: 'success',
                message: 'Home Test'
            }).code(200);
        }
    },
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