const MascotaOptions = {
    store: {
        schema: {
            body: {
                type: 'object',
                properties: {
                    nombre: { type: 'string' },
                    sexo: { type: 'string' },
                    descripcion: { type: 'string' },
                    esterilizacion: { type: 'number' },
                    categoria_id: { type: 'number' },
                    size_id: { type: 'number' },
                    edad_id: { type: 'number' },
                    ciudad_id: { type: 'number' },
                    fundacion_id: { type: 'number' },
                    estado_id: { type: 'number' },
                },
                required: ['nombre', 'sexo', 'esterilizacion', 'categoria_id', 'size_id', 'edad_id', 'ciudad_id', 'fundacion_id', 'estado_id']
            }
        }
    }
};

module.exports = {MascotaOptions};
