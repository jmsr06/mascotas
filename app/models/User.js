const { Model } = require("objection");

const db = require("@config/connection");

Model.knex(db);

class User extends Model {
    static get tableName() {
        return 'users';
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
                email: { type: 'string', minLength: 1, maxLength: 191 },
                password: { type: 'string', minLength: 1, maxLength: 191 },
                rol: { type: 'integer'},
                created_at: { type: 'string'},
                updated_at: { type: 'string'},
            },
            additionalProperties: true
        };
    }
}

module.exports = User;