const routes = [
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {
          return "Hello World !";
        },
    },
];

module.exports = {
    name: 'routes',
    version: '1.0.0',
    register: async (server, options) => {
        server.route(routes);
    }
}