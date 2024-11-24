const AuthController = require('./controllers/AuthController');

const AuthValidator = require('./validators/AuthValidator');

const routes = [
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {
          return "Hello World !";
        },
    },
    {
        method: 'POST',
        path: '/api/register',
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
        path: '/api/login',
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
        path: '/api/refresh',
        options: { auth: false },
        handler: AuthController.refreshAccessToken
    },
    {
        method: 'GET',
        path: '/{any*}',
        handler: (request, h) => {
            return `Oops! 404 Not Found!`
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