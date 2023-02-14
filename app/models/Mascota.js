const { Model } = require("objection");

const db = require("@config/connection");
const ImagenMascotas = require("@models/ImagenMascota")

Model.knex(db);

class Mascota extends Model {
    static get tableName() {
        return 'mascotas';
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
                nombre: { type: 'string', minLength: 1, maxLength: 100 },
                slug: { type: 'string', minLength: 1, maxLength: 100 },
                sexo: { type: 'string', minLength: 1, maxLength: 1 },
                descripcion: { type: 'string', minLength: 0, maxLength: 1000 },
                esterilizacion: { type: 'integer' },
                categoria_id: { type: 'integer' },
                size_id: { type: 'integer' },
                edad_id: { type: 'integer' },
                ciudad_id: { type: 'integer' },
                fundacion_id: { type: 'integer' },
                estado_id: { type: 'integer' },
                publicacion: { type: 'integer' },
                revision: { type: 'integer' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
            },
            additionalProperties: true
        };
    }

    static relationMappings = {
        imagenes: {
            relation: Model.HasManyRelation,
            modelClass: ImagenMascotas,
            join: {
                from: 'mascotas.id',
                to: 'imagen_mascotas.mascota_id'
            }
        }
    };
}

module.exports = Mascota;