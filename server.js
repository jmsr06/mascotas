const server = require('fastify')();
const cors = require('@fastify/cors')
const { mascotasIndex, getMascota, getImagenes, getMascotaFundacion, mascotaRemove } = require('./Controllers/MascotasController')
const { estadoIndex } = require('./Controllers/EstadoController')
const {categoriasIndex, categoriaMascotas} = require('./Controllers/CategoriaController');
const { sizesIndex } = require('./Controllers/SizeController');
const { edadesIndex } = require('./Controllers/EdadController');
const { fundacionesIndex, getFundacion } = require('./Controllers/FundacionesController');

server.register(require('@fastify/mysql'), {
    connectionString: 'mysql://root@localhost/mascotas'
})

server.register(cors);

server.get('/api', function (request, reply) {
    reply.send('Hola desde el servidor' )
})


//MASCOTAS
server.get('/mascotas', async function (request, reply) {
    try {
        const response = await mascotasIndex(server)
        reply.send(response)
    } catch (error) {
        reply.send(error)
    }
})

// server.post('/mascotas', {
//     schema: {
//         body: {
//             type: 'object',
//             properties: {
//                 nombre: { type: 'string' },
//             },
//             required: ['nombre']
//         }
//     }
// }, async function (request, reply) {
//     try {
//         const response = await mascotasStore(server, request.body)
//         reply.status(response.statusCode).send(response)
//     } catch (error) {
//         reply.status(response.statusCode).send(response)
//     }
// })

// server.put('/mascotas/:slug', {
//     schema: {
//         params: {
//             type: 'object',
//             properties: {
//                 slug: { type: 'string' },
//             }
//         },
//         body: {
//             type: 'object',
//             properties: {
//                 nombre: { type: 'string' },
//             },
//             required: ['nombre']
//         }
//     }
// }, async function (request, reply) {
//     try {
//         const response = await mascotaUpdate(server, request.body, request.params.slug)
//         reply.status(response.statusCode).send(response)
//     } catch (error) {
//         reply.status(error.statusCode).send(error)
//     }
// })

server.get('/mascotas/:slug', {
    schema: {
        params: {
            type: 'object',
            properties: {
                slug: { type: 'string' },
            }
        }
    }
}, async function (request, reply) {
    try {
        const mascota = await getMascota(server, request.params.slug)
        mascota.data = mascota.data[0]
        const imagenes = await getImagenes(server, mascota.data.id)
        mascota.data.imagenes = imagenes.data
        reply.status(mascota.statusCode).send(mascota)
    } catch (error) {
        reply.status(error.statusCode).send(error)
    }
})

server.get('/mascotas/fundacion/:fundacionSlug/:estadoSlug', {
    schema: {
        params: {
            type: 'object',
            properties: {
                fundacionSlug: { type: 'string' },
                estadoSlug: { type: 'string' },
            }
        }
    }
}, async function (request, reply) {
    try {
        const mascota = await getMascotaFundacion(server, request.params.fundacionSlug, request.params.estadoSlug)
        reply.status(mascota.statusCode).send(mascota)
    } catch (error) {
        reply.status(error.statusCode).send(error)
    }
})

server.delete('/mascotas/:slug', {
    schema: {
        params: {
            type: 'object',
            properties: {
                slug: { type: 'string' },
            }
        }
    }
}, async function (request, reply) {
    try {
        const response = await mascotaRemove(server, request.params.slug)
        reply.status(response.statusCode).send(response)
    } catch (error) {
        reply.status(error.statusCode).send(error)
    }
})

// server.get('/:slugEstado',{
//     schema: {
//         params: {
//             type: 'object',
//             properties: {
//                 slug: { type: 'string' },
//             }
//         }
//     }
// }, async function (request, reply) {
//     try {
//         const response = await estadoIndex(server, request.params.slugEstado)
//         reply.send(response)
//     } catch (error) {
//         reply.send(error)
//     }
// })

//CATEGORIAS
server.get('/categorias', async function (request, reply) {
    try {
        const response = await categoriasIndex(server)
        reply.send(response)
    } catch (error) {
        reply.send(error)
    }
})

//SIZES
server.get('/sizes', async function (request, reply) {
    try {
        const response = await sizesIndex(server)
        reply.send(response)
    } catch (error) {
        reply.send(error)
    }
})

//EDADES
server.get('/edades', async function (request, reply) {
    try {
        const response = await edadesIndex(server)
        reply.send(response)
    } catch (error) {
        reply.send(error)
    }
})

//ESTADO
server.get('/:slugEstado',{
    schema: {
        params: {
            type: 'object',
            properties: {
                slug: { type: 'string' },
            }
        }
    }
}, async function (request, reply) {
    try {
        const response = await categoriaMascotas(server, request.params.slugEstado, request.query)
        reply.send(response)
    } catch (error) {
        reply.send(error)
    }
})

//FUNDACIONES
server.get('/fundaciones', async function (request, reply) {
    try {
        const response = await fundacionesIndex(server)
        reply.send(response)
    } catch (error) {
        reply.send(error)
    }
})

server.get('/fundaciones/:slug', {
    schema: {
        params: {
            type: 'object',
            properties: {
                slug: { type: 'string' },
            }
        }
    }
}, async function (request, reply) {
    try {
        const fundacion = await getFundacion(server, request.params.slug)
        fundacion.data = fundacion.data[0]
        reply.status(fundacion.statusCode).send(fundacion)
    } catch (error) {
        reply.status(error.statusCode).send(error)
    }
})

server.listen({ port: 3000 }, function (err, address) {
    console.log('server on')
    if (err) {
        server.log.error(err)
    console.log(err)
        process.exit(1)
    }
})