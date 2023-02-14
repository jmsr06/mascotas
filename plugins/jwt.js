const fp = require('fastify-plugin');
const config = require('@config/app')


module.exports = fp(function (fastify, opts, done) {

    fastify.register(require('@fastify/jwt'), {
        // formatUser: function (user) {
        //     return {
        //         id: user.id,
        //         email: user.email
        //     }
        // },
        secret: config.jwt.service_key
    })

    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.status(401).send(err)
        }
    })

    done()
})
