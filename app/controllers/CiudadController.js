require('module-alias/register') // ALIAS
//Models
const Ciudad = require('@models/Ciudad');

class CiudadController {

    static async index(request, reply) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };

            const ciudades = await Ciudad.query().select(
                'id',
                'nombre',
                'slug',
                'created_at',
                'updated_at'
            )
            .orderBy('nombre', 'DESC')

            response.statusCode = 200
            response.message = 'OK'
            response.data = ciudades;
            reply.send(response);

        } catch(err) {
            console.log(err)
            reply.send({
                statusCode: 500,
                message: 'Server error',
                data: []
            });
        }
    }
}

module.exports = CiudadController