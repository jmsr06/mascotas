const { Model } = require("objection");

const db = require("@config/connection");

Model.knex(db);

class Categoria extends Model {
    static get tableName() {
        return 'categorias';
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
                slug: { type: 'string', minLength: 1, maxLength: 100 },
                imagen: { type: 'string', minLength: 1, maxLength: 255 },
                created_at: { type: 'string'},
                updated_at: { type: 'string'},
            },
            additionalProperties: true
        };
    }
}

module.exports = Categoria;