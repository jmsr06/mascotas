require('module-alias/register') // ALIAS
//Models
const Size = require('@models/Size');

class SizeController {

    static async index(request, reply) {
        try {
            const response = {
                statusCode: 500,
                message: '',
                data: []
            };

            const sizes = await Size.query().select(
                'id',
                'nombre',
                'slug',
                'created_at',
                'updated_at'
            )
                .orderBy('nombre', 'DESC')

            response.statusCode = 200
            response.message = 'OK'
            response.data = sizes;
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
}

module.exports = SizeController