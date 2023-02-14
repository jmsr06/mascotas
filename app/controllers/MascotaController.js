require('module-alias/register') // ALIAS
const slugLibrary = require('slug');
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.locale('es');
dayjs.extend(utc);
dayjs.extend(timezone);
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { transaction } = require('objection');

//Models
const Mascota = require('@models/Mascota');
const ImagenMascota = require('@models/ImagenMascota');

class MascotaController {

    static async index(request, reply) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            const mascotas = await Mascota.query().select(
                'id',
                'nombre',
                'slug',
                'sexo',
                'descripcion',
                'esterilizacion',
                'categoria_id',
                'size_id',
                'edad_id',
                'ciudad_id',
                'fundacion_id',
                'estado_id',
                'publicacion',
                'revision',
                'created_at',
                'updated_at'
            )
                .orderBy('nombre', 'DESC')
            response.statusCode = 200
            response.message = 'OK'
            response.data = mascotas;
            reply.send(response);
        } catch (err) {
            reply.send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async store(request, reply) {
        const req = request.body
        const images = request.body.imagenes;
        const slug = slugLibrary(req.nombre)
        const trx = await Mascota.startTransaction();
        console.log(request.body)
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            const mascota = await Mascota.query().insert({
                nombre: req.nombre,
                slug: slug,
                sexo: req.sexo,
                descripcion: req.descripcion,
                esterilizacion: parseInt(req.esterilizacion),
                categoria_id: parseInt(req.categoria_id),
                size_id: parseInt(req.size_id),
                edad_id: parseInt(req.edad_id),
                ciudad_id: parseInt(req.ciudad_id),
                fundacion_id: parseInt(req.fundacion_id),
                estado_id: parseInt(req.estado_id),
            });
            images.forEach(async (img, index) => {
                const name = 'public/imagenes-mascotas/' + crypto.randomBytes(16).toString('hex') + '.jpg';
                const buffer = Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                fs.writeFileSync(path.join(process.env.DIR_NAME, name), buffer);
                await ImagenMascota.query().insert({
                    url: name,
                    prioridad: index + 1,
                    mascota_id: mascota.id
                })
            });
            await trx.commit();
            response.statusCode = 201
            response.message = 'OK'
            response.data = [];
            reply.status(201).send(response);
        } catch (err) {
            console.log(err)
            await trx.rollback();
            reply.status(500).send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async update(request, reply) {
        const req = request.body
        const fecha = dayjs().format('YYYY-MM-DD H:m:s')
        const images = request.body.imagenes;
        const slug = slugLibrary(req.nombre)
        const trx = await Mascota.startTransaction();
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            const imagenes = await ImagenMascota.query().select(
                    'id',
                    'url'
                )
                .where('mascota_id', request.params.id)

            const imgLink = images.filter(img => img.includes('/public/imagenes-mascotas/'))

            imagenes.forEach(async (img) => {
                const path = `./${img.url}`
                if (!imgLink.includes(`${process.env.APP_URL}/${img.url}`)) {
                    if (fs.existsSync(path)) {
                        fs.rm(path, { recursive: true, force: true }, () => (error) => {
                            if (error) {
                                console.error(error);
                            }
                        })
                    } else {
                        console.log('este path no existe', path)
                    }
                    await ImagenMascota.query().delete()
                        .where('mascota_id', parseInt(request.params.id))
                        .where('id', parseInt(img.id))
                }
            })

            await Mascota.query().update({
                nombre: req.nombre,
                slug: slug,
                sexo: req.sexo,
                descripcion: req.descripcion,
                esterilizacion: parseInt(req.esterilizacion),
                categoria_id: parseInt(req.categoria_id),
                size_id: parseInt(req.size_id),
                edad_id: parseInt(req.edad_id),
                ciudad_id: parseInt(req.ciudad_id),
                fundacion_id: parseInt(req.fundacion_id),
                estado_id: parseInt(req.estado_id),
                updated_at: fecha
            })
                .where('id', request.params.id)

            images.forEach(async (img, index) => {
                if (img.includes('/public/imagenes-mascotas/')) {
                    const i = img.search('public/')
                    await ImagenMascota.query().update({
                        prioridad: index + 1,
                        updated_at: fecha
                    })
                        .where('mascota_id', request.params.id)
                        .where('url', img.substring(i))
                } else {
                    const name = 'public/imagenes-mascotas/' + crypto.randomBytes(16).toString('hex') + '.jpg';
                    const buffer = Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    fs.writeFileSync(path.join(process.env.DIR_NAME, name), buffer);
                    await ImagenMascota.query().insert({
                        url: name,
                        prioridad: index + 1,
                        mascota_id: parseInt(request.params.id)
                    })
                }
            });


            await trx.commit();
            response.statusCode = 201
            response.message = 'OK'
            response.data = [];
            reply.status(201).send(response);
        } catch (err) {
            console.log(err)
            await trx.rollback();
            reply.status(500).send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async show(request, reply) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            const mascota = await Mascota.query().select(
                'mascotas.id',
                'mascotas.nombre',
                'mascotas.slug',
                'mascotas.sexo',
                'mascotas.descripcion',
                'mascotas.esterilizacion',
                'mascotas.categoria_id',
                'mascotas.size_id',
                'mascotas.edad_id',
                'mascotas.ciudad_id',
                'mascotas.fundacion_id',
                'mascotas.estado_id',
                'mascotas.publicacion',
                'mascotas.revision',
                'mascotas.created_at',
                'mascotas.updated_at',
                'fundaciones.nombre as fundacion',
                'fundaciones.slug as fundacion_slug',
                'fundaciones.telefono as telefono',
                'ciudades.nombre as ciudad',
                'estados.nombre as estado',
                'edades.nombre as edad',
                'sizes.nombre as size'
            )
                .join('estados', 'mascotas.estado_id', 'estados.id')
                .join('edades', 'mascotas.edad_id', 'edades.id')
                .join('sizes', 'mascotas.size_id', 'sizes.id')
                .join('ciudades', 'mascotas.ciudad_id', 'ciudades.id')
                .join('fundaciones', 'mascotas.fundacion_id', 'fundaciones.id')
                .where('mascotas.slug', '=', request.params.slug)
                .first()
            const imagenes = await ImagenMascota.query().select(
                'prioridad',
                'url',
            )
                .where('mascota_id', '=', mascota.id)
            mascota.imagenes = imagenes.map((img) => {
                img.url = `${process.env.APP_URL}/${img.url}`
                return img
            })
            response.statusCode = 200
            response.message = 'OK'
            response.data = mascota;
            reply.send(response);
        } catch (err) {
            console.log(err)
            reply.status(500).send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async getImagenes(request, reply, id) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            const mascotas = await Mascota.query().select(
                'id',
                'url',
                'prioridad',
                'mascota_id',
                'created_at',
                'updated_at'
            )
                .where('mascota_id', '=', id)
                .orderBy('prioridad', 'ASC')
            response.statusCode = 200
            response.message = 'OK'
            response.data = mascotas;
            reply.send(response);
        } catch (err) {
            reply.send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async getMascotasFundacion(request, reply) {
        try {
            let page = 0
            if (request.query.page) {
                page = parseInt(request.query.page) - 1
            }
            const perPage = 10;
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            let mascotas = Mascota.query().select(
                'mascotas.id',
                'mascotas.nombre',
                'mascotas.slug',
                'mascotas.sexo',
                'mascotas.descripcion',
                'mascotas.esterilizacion',
                'mascotas.categoria_id',
                'mascotas.size_id',
                'mascotas.edad_id',
                'mascotas.ciudad_id',
                'mascotas.fundacion_id',
                'mascotas.estado_id',
                'mascotas.publicacion',
                'mascotas.revision',
                'mascotas.created_at',
                'mascotas.updated_at',
                'imagen_mascotas.url as imagen',
                'fundaciones.slug as fundacion_slug',
                'ciudades.nombre as ciudad',
                'estados.nombre as estado',
                'edades.nombre as edad',
                'sizes.nombre as size'
            )
                .join('estados', 'mascotas.estado_id', 'estados.id')
                .join('edades', 'mascotas.edad_id', 'edades.id')
                .join('sizes', 'mascotas.size_id', 'sizes.id')
                .join('ciudades', 'mascotas.ciudad_id', 'ciudades.id')
                .join('fundaciones', 'mascotas.fundacion_id', 'fundaciones.id')
                .join('imagen_mascotas', 'mascotas.id', 'imagen_mascotas.mascota_id')
                .where('fundaciones.user_id', request.user.id)
                .where('imagen_mascotas.prioridad', '=', 1)

            if (request.query.categoria) {
                mascotas = mascotas.where('mascotas.categoria_id', '=', request.query.categoria)
            }
            if (request.query.size) {
                mascotas = mascotas.where('mascotas.size_id', '=', request.query.size)
            }
            if (request.query.edad) {
                mascotas = mascotas.where('mascotas.edad_id', '=', request.query.edad)
            }
            if (request.query.sexo) {
                mascotas = mascotas.where('mascotas.sexo', '=', request.query.sexo)
            }
            if (request.query.esterilizacion) {
                mascotas = mascotas.where('mascotas.esterilizacion', '=', request.query.esterilizacion)
            }

            mascotas = await mascotas.page(page, perPage)
            mascotas.results = mascotas.results.map((mascota) => {
                mascota.imagen = `${process.env.APP_URL}/${mascota.imagen}`
                return mascota
            });
            mascotas.paginas = Math.ceil(mascotas.total / perPage)
            mascotas.perPage = perPage
            mascotas.page = page + 1
            response.statusCode = 200
            response.message = 'OK'
            response.data = mascotas
            reply.status(200).send(response);
        } catch (err) {
            console.log(err)
            reply.status(500).send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async getMascotasFundacionEstado(request, reply) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            let mascotas = Mascota.query().select(
                'mascotas.id',
                'mascotas.nombre',
                'mascotas.slug',
                'mascotas.sexo',
                'mascotas.descripcion',
                'mascotas.esterilizacion',
                'mascotas.categoria_id',
                'mascotas.size_id',
                'mascotas.edad_id',
                'mascotas.ciudad_id',
                'mascotas.fundacion_id',
                'mascotas.estado_id',
                'mascotas.publicacion',
                'mascotas.revision',
                'mascotas.created_at',
                'mascotas.updated_at',
                'imagen_mascotas.url as imagen',
                'fundaciones.slug as fundacion_slug',
                'ciudades.nombre as ciudad',
                'estados.nombre as estado',
                'edades.nombre as edad',
                'sizes.nombre as size'
            )
                .join('estados', 'mascotas.estado_id', 'estados.id')
                .join('edades', 'mascotas.edad_id', 'edades.id')
                .join('sizes', 'mascotas.size_id', 'sizes.id')
                .join('ciudades', 'mascotas.ciudad_id', 'ciudades.id')
                .join('fundaciones', 'mascotas.fundacion_id', 'fundaciones.id')
                .join('imagen_mascotas', 'mascotas.id', 'imagen_mascotas.mascota_id')
                .where('fundaciones.slug', request.params.fundacionSlug)
                .where('estados.slug', request.params.estadoSlug)
                .where('imagen_mascotas.prioridad', '=', 1)

            if (request.query.categoria) {
                mascotas = mascotas.where('mascotas.categoria_id', '=', request.query.categoria)
            }
            if (request.query.size) {
                mascotas = mascotas.where('mascotas.size_id', '=', request.query.size)
            }
            if (request.query.edad) {
                mascotas = mascotas.where('mascotas.edad_id', '=', request.query.edad)
            }
            if (request.query.sexo) {
                mascotas = mascotas.where('mascotas.sexo', '=', request.query.sexo)
            }
            if (request.query.esterilizacion) {
                mascotas = mascotas.where('mascotas.esterilizacion', '=', request.query.esterilizacion)
            }

            mascotas = await mascotas.orderBy('mascotas.nombre', 'ASC')
            response.statusCode = 200
            response.message = 'OK'
            response.data = mascotas.map((mascota) => {
                mascota.imagen = `${process.env.APP_URL}/${mascota.imagen}`
                return mascota
            });
            reply.send(response);
        } catch (err) {
            reply.send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async remove(request, reply) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            const imagenes = await ImagenMascota.query().select(
                'id',
                'url',
                'prioridad',
                'mascota_id',
                'created_at',
                'updated_at'
            )
                .where('mascota_id', '=', request.params.id)
            imagenes.forEach(img => {
                fs.unlink(`./${img.url}`, (error) => {
                    if (error) {
                        console.error(error);
                    }
                }
                )
            });
            await ImagenMascota.query().delete()
                .where('mascota_id', '=', request.params.id)
            await Mascota.query().delete()
                .where('id', '=', request.params.id)
            response.statusCode = 200
            response.message = 'OK'
            response.data = [];
            reply.send(response);
        } catch (err) {
            reply.send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async filter(request, reply) {
        let mascotas = Mascota.query().select(
            'mascotas.id',
            'mascotas.nombre',
            'mascotas.slug',
            'mascotas.sexo',
            'mascotas.descripcion',
            'mascotas.esterilizacion',
            'mascotas.categoria_id',
            'mascotas.size_id',
            'mascotas.edad_id',
            'mascotas.ciudad_id',
            'mascotas.fundacion_id',
            'mascotas.estado_id',
            'mascotas.publicacion',
            'mascotas.revision',
            'mascotas.created_at',
            'mascotas.updated_at',
            'estados.nombre as estado',
            'edades.nombre as edad',
            'sizes.nombre as size',
            'imagen_mascotas.url as imagen',
        )
            .join('estados', 'mascotas.estado_id', 'estados.id')
            .join('edades', 'mascotas.edad_id', 'edades.id')
            .join('categorias', 'mascotas.categoria_id', 'categorias.id')
            .join('sizes', 'mascotas.size_id', 'sizes.id')
            .leftJoin('imagen_mascotas', 'mascotas.id', 'imagen_mascotas.mascota_id')
            .where('estados.slug', '=', request.params.slugEstado)
            .where('imagen_mascotas.prioridad', '=', 1)

        if (request.query.categoria) {
            mascotas = mascotas.where('mascotas.categoria_id', '=', request.query.categoria)
        }
        if (request.query.size) {
            mascotas = mascotas.where('mascotas.size_id', '=', request.query.size)
        }
        if (request.query.edad) {
            mascotas = mascotas.where('mascotas.edad_id', '=', request.query.edad)
        }
        if (request.query.sexo) {
            mascotas = mascotas.where('mascotas.sexo', '=', request.query.sexo)
        }
        if (request.query.esterilizacion) {
            mascotas = mascotas.where('mascotas.esterilizacion', '=', request.query.esterilizacion)
        }
        try {
            mascotas = await mascotas.orderBy('mascotas.nombre', 'ASC')
            mascotas = mascotas.map((mascota) => {
                mascota.imagen = `${process.env.APP_URL}/${mascota.imagen}`
                return mascota
            })
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            response.statusCode = 200
            response.message = 'OK'
            response.data = mascotas;
            reply.send(response);

        } catch (err) {
            reply.send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }
}

module.exports = MascotaController