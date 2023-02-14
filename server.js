require('module-alias/register') // ALIAS
require('dotenv').config()
const server = require('fastify')();
const cors = require('@fastify/cors')
const path = require('path');
const FastifyStatic = require('@fastify/static');
const config = require('@config/app')
// const AutoLoad = require('fastify-autoload')

process.env.DIR_NAME = __dirname

server.register(require('@plugins/jwt'),{})

// server.register(require('@fastify/jwt'), { secret: config.jwt.service_key })

server.register(cors);

server.register(FastifyStatic, {
    root: path.join(__dirname, "public"),
    prefix: '/public/',
});

//Registrando routes externas
server.setErrorHandler(function (error, request, reply) {
    // request.log.error(error, `This error has status code ${error.statusCode}`)
    reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: 'error',
        data: [],
        error: error
    })
})

// server.register(AutoLoad, {
//     dir: path.join(__dirname, 'plugins'),
//     options: Object.assign({}, {})
// })

server.register(require('@routes/api'), { prefix: '/' })

server.listen({ port: 3000 }, function (err, address) {
    console.log('server on')
    if (err) {
        server.log.error(err)
        console.log(err)
        process.exit(1)
    }
})