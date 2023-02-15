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

//Models
const Fundacion = require('@models/Fundacion');

class FundacionController {

    static async index(request, reply) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            const fundaciones = await Fundacion.query().select(
                'fundaciones.id',
                'fundaciones.nombre',
                'fundaciones.slug',
                'fundaciones.descripcion',
                'fundaciones.logo',
                'fundaciones.direccion',
                'fundaciones.telefono',
                'fundaciones.estado',
                'fundaciones.comentario',
                'fundaciones.revision',
                'fundaciones.email',
                'fundaciones.facebook',
                'fundaciones.whatsapp',
                'fundaciones.instagram',
                'fundaciones.user_id',
                'fundaciones.ciudad_id',
                'fundaciones.updated_at',
                'fundaciones.updated_at',
                'ciudades.nombre as ciudad',
            )
                .join('ciudades', 'fundaciones.ciudad_id', 'ciudades.id')
                .orderBy('id', 'ASC')

            fundaciones.map((fundacion) => {
                fundacion.logo = `${process.env.APP_URL}/${fundacion.logo}`
                return fundacion
            })

            response.statusCode = 200
            response.message = 'OK'
            response.data = fundaciones;
            reply.send(response);

        } catch (err) {
            console.log(err)
            reply.send({
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
            const fundacion = await Fundacion.query().select(
                'fundaciones.id',
                'fundaciones.nombre',
                'fundaciones.slug',
                'fundaciones.descripcion',
                'fundaciones.logo',
                'fundaciones.direccion',
                'fundaciones.telefono',
                'fundaciones.estado',
                'fundaciones.comentario',
                'fundaciones.revision',
                'fundaciones.email',
                'fundaciones.facebook',
                'fundaciones.whatsapp',
                'fundaciones.instagram',
                'fundaciones.user_id',
                'fundaciones.ciudad_id',
                'fundaciones.updated_at',
                'fundaciones.updated_at',
                'ciudades.nombre as ciudad',
            )
                .join('ciudades', 'fundaciones.ciudad_id', 'ciudades.id')
                .where('fundaciones.slug', '=', request.params.slug)
                .first()
            fundacion.logo = `${process.env.APP_URL}/${fundacion.logo}`
            response.statusCode = 200
            response.message = 'OK'
            response.data = fundacion
            reply.send(response);

        } catch (err) {
            console.log(err)
            reply.send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async store(request, reply) {
        const req = request.body
        const slug = slugLibrary(request.body.nombre)
        const image = request.body.logo;
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            let logo = ''
            if (image) {
                logo = 'public/logos-fundaciones/' + crypto.randomBytes(16).toString('hex') + '.jpg';
                console.log('logo', logo)
                const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                fs.writeFileSync(path.join(process.env.DIR_NAME, logo), buffer);
            }
            const fundacion = await Fundacion.query().insert({
                nombre: req.nombre,
                slug: slug,
                descripcion: req.descripcion,
                logo: image ? logo : null,
                direccion: req.direccion,
                telefono: req.telefono,
                email: req.email,
                facebook: req.facebook,
                whatsapp: req.whatsapp,
                instagram: req.instagram,
                user_id: parseInt(req.user_id),
                ciudad_id: parseInt(req.ciudad_id)
            });
            response.statusCode = 201
            response.message = 'OK'
            response.data = fundacion;
            reply.status(201).send(response);
        } catch (err) {
            console.log(err)
            reply.status(500).send({
                statusstatusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    static async update(request, reply) {
        const req = request.body
        const fecha = dayjs().format('YYYY-MM-DD H:m:s')
        const slug = request.body.slug
        const image = request.body.logo;
        let logo = null
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            if (!image.includes(`${process.env.APP_URL}/`)) {
                const img = await Fundacion.query().select('logo')
                    .where('id', req.id)
                const url_img = `./${img[0].logo}`
                if (fs.existsSync(url_img)) {
                    fs.rm(url_img, { recursive: true, force: true }, () => (error) => {
                        if (error) {
                            console.error(error);
                        }
                    })
                } else {
                    console.log('este path no existe', url_img)
                }
                if (!image) {
                    logo = ''
                } else {
                    if (!image.includes('/public/logos-fundaciones/')) {
                        logo = 'public/logos-fundaciones/' + crypto.randomBytes(16).toString('hex') + '.jpg';
                        const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                        fs.writeFileSync(path.join(process.env.DIR_NAME, logo), buffer);
                    }
                }
            } else {
                logo = image.split('/')[3] + '/' + image.split('/')[4] + '/' + image.split('/')[5];
            }
            const fundacion = await Fundacion.query().update({
                nombre: req.nombre,
                slug: slug,
                descripcion: req.descripcion,
                logo: logo,
                direccion: req.direccion,
                telefono: req.telefono,
                email: req.email,
                facebook: req.facebook,
                whatsapp: req.whatsapp,
                instagram: req.instagram,
                user_id: parseInt(req.user_id),
                ciudad_id: parseInt(req.ciudad_id),
                updated_at: fecha
            })
                .where('id', request.params.id)
            response.statusCode = 201
            response.message = 'OK'
            response.data = [];
            reply.status(201).send(response);
        } catch (err) {
            console.log(err)
            reply.status(500).send({
                statusstatusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }
}

module.exports = FundacionController