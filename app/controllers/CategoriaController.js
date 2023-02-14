require('module-alias/register') // ALIAS
//Models
const Categoria = require('@models/Categoria');

class CategoriaController {

    static async index(request, reply) {
        try {
            const response = {
                statusCode: 0,
                message: '',
                data: []
            };

            const categorias = await Categoria.query().select(
                'id',
                'nombre',
                'slug',
                'imagen',
                'created_at',
                'updated_at'
            )
                .orderBy('nombre', 'DESC')

            response.statusCode = 200
            response.message = 'OK'
            response.data = categorias;
            reply.send(response);

        } catch (err) {
            reply.send({
                statusCode: 0,
                message: 'Server error',
                data: []
            });
        }
    }
}

module.exports = CategoriaController