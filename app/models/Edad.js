const { Model } = require("objection");

const db = require("@config/connection");

Model.knex(db);

class Edad extends Model {
    static get tableName() {
        return 'edades';
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
                nombre: { type: 'string', minLength: 1, maxLength: 20 },
                slug: { type: 'string', minLength: 1, maxLength: 20 },
                created_at: { type: 'string'},
                updated_at: { type: 'string'},
            },
            additionalProperties: true
        };
    }
}

module.exports = Edad;