require('module-alias/register') // ALIAS
//Models
const Edad = require('@models/Edad');

class EdadController {

    static async index(request, reply) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };

            const edades = await Edad.query().select(
                'id',
                'nombre',
                'slug',
                'created_at',
                'updated_at'
            )
            .orderBy('nombre', 'DESC')

            response.statusCode = 200
            response.message = 'OK'
            response.data = edades;
            reply.send(response);

        } catch(err) {
            reply.send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }
}

module.exports = EdadController