const { Model } = require("objection");

const db = require("@config/connection");

Model.knex(db);

class ImagenMascota extends Model {
    static get tableName() {
        return 'imagen_mascotas';
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
                url: { type: 'string', minLength: 1, maxLength: 191 },
                prioridad: { type: 'integer' },
                mascota_id : { type: 'integer' },
                created_at: { type: 'string'},
                updated_at: { type: 'string'},
            },
            additionalProperties: true
        };
    }
}

module.exports = ImagenMascota;