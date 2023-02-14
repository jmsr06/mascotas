const { Model } = require("objection");

const db = require("@config/connection");

Model.knex(db);

class Fundacion extends Model {
    static get tableName() {
        return 'fundaciones';
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [],
            properties: {
                id: { type: 'integer' },
                nombre: { type: 'string', minLength: 1, maxLength: 50 },
                slug: { type: 'string', minLength: 1, maxLength: 191 },
                descripcion: { type: 'string', maxLength: 1000 },
                logo: { type: ['string', 'null'] },
                telefono: { type: 'string', minLength: 1, maxLength: 10 },
                estado: { type: 'integer' },
                comentario: { type: ['string','null'], minLength: 1, maxLength: 1000 },
                revision: { type: ['integer','null'] },
                email: { type: 'string', minLength: 1, maxLength: 191 },
                facebook: { type: ['string','null'], maxLength: 191 },
                whatsapp: { type: ['string','null'], maxLength: 191 },
                instagram: { type: ['string','null'], maxLength: 191 },
                user_id: { type: 'integer' },
                ciudad_id : { type: 'integer' },
                created_at: { type: 'string'},
                updated_at: { type: 'string'},
            },
            additionalProperties: true
        };
    }
}

module.exports = Fundacion;