require('module-alias/register') // ALIAS
//Models
const Estado = require('@models/Estado');

class EstadoController {

    static async index(request, reply) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };
            const estados = await Estado.query().select(
                'id',
                'nombre',
                'slug',
                'created_at',
                'updated_at'
            )
                .orderBy('nombre', 'DESC')
            response.statusCode = 200
            response.message = 'OK'
            response.data = estados;
            reply.send(response);
        } catch (err) {
            reply.send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }

    // static async mascotasEstado(request, reply, slugEstado) {
    //     try {
    //         const response = {
    //             statusCode: 0,
    //             message: '',
    //             data: []
    //         };
    //         const estados = await Estado.query().select(
    //             'mascotas.id',
    //             'mascotas.nombre',
    //             'mascotas.slug',
    //             'mascotas.sexo',
    //             'mascotas.descripcion',
    //             'mascotas.esterilizacion',
    //             'mascotas.categoria_id',
    //             'mascotas.size_id',
    //             'mascotas.edad_id',
    //             'mascotas.ciudad_id',
    //             'mascotas.fundacion_id',
    //             'mascotas.estado_id',
    //             'mascotas.publicacion',
    //             'mascotas.revision',
    //             'mascotas.created_at',
    //             'mascotas.updated_at',
    //         )
    //             .select('estados.nombre', 'estado')
    //             .select('edades.nombre', 'edad')
    //             .select('sizes.nombre', 'size')
    //             .select('imagen_mascotas.url', 'imagen')
    //             .select('fundaciones.slug', 'fundacion_slug')
    //             .join('estados', 'mascotas.estado_id', 'estados.id')
    //             .join('edades', 'mascotas.edad_id', 'edades.id')
    //             .join('sizes', 'mascotas.size_id', 'sizes.id')
    //             .leftJoin('imagen_mascotas', 'mascotas.id', 'imagen_mascotas.mascota_id')
    //             .where('estados.slug', '=', slugEstado)
    //             .where('fundaciones.slug', fundacionSlug)
    //             .andWhere('imagen_mascotas.prioridad', '=', 1)
    //             .orderBy('nombre', 'DESC')
    //         response.statusCode = 200
    //         response.message = 'OK'
    //         response.data = estados;
    //         reply.send(response);
    //     } catch (err) {
    //         reply.send({
    //             statusCode: 500,
    //             message: 'Server error',
    //             data: []
    //         });
    //     }
    // }
}

module.exports = EstadoController