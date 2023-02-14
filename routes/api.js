//Controllers
const CategoriaController = require('@controllers/CategoriaController');
const CiudadController = require('@controllers/CiudadController');
const EdadController = require('@controllers/EdadController');
const EstadoController = require('@controllers/EstadoController');
const FundacionController = require('@controllers/FundacionController');
const SizeController = require('@controllers/SizeController');
const MascotaController = require('@controllers/MascotaController');
const LoginController = require('../app/controllers/LoginController');

//OPTIONS
const {MascotaOptions} = require('@options/MascotaOptions');
const {registerOptions} = require('@options/LoginOptions');

module.exports = function (fastify, opts, done) {
    fastify.get('/', (request, reply) => {
        reply.send('server')
    })
    fastify.get('/categorias' , CategoriaController.index)
    // fastify.get('/categorias',{onRequest: [fastify.authenticate]} , CategoriaController.index)
    fastify.get('/ciudades', CiudadController.index)
    fastify.get('/edades', EdadController.index)
    fastify.get('/estados', EstadoController.index)
    fastify.get('/estados/:slugEstado', MascotaController.filter)
    //FUNDACIONES
    fastify.get('/fundaciones', FundacionController.index)
    fastify.get('/fundaciones/:slug', FundacionController.show)
    fastify.post('/fundacionStore', FundacionController.store)
    fastify.put('/fundaciones/:id', FundacionController.update)
    //MASCOTAS
    fastify.get('/mascotas', MascotaController.index)
    fastify.post('/mascotasStore',MascotaOptions.store, MascotaController.store)
    fastify.get('/mascotas/:slug', MascotaController.show)
    fastify.put('/mascotas/:id', MascotaController.update)
    fastify.get('/fundacion/:fundacionSlug/mascotas', MascotaController.getMascotasFundacion)
    fastify.get('/fundacion/:fundacionSlug/mascotas/:estadoSlug', MascotaController.getMascotasFundacionEstado)
    fastify.delete('/eliminarMascota/:id', MascotaController.remove)

    fastify.get('/sizes', SizeController.index)

    fastify.post('/login',registerOptions, LoginController.login)
    fastify.post('/register', registerOptions ,LoginController.register)
    fastify.post('/logout',{onRequest: [fastify.authenticate]} ,LoginController.logout)
    done()
}
