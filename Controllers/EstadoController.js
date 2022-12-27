const estadoIndex = (server, slugEstado) => (new Promise((resolve, reject) => {
    server.mysql.query(
        "select mascotas.*, estados.nombre as estado, edades.nombre as edad, sizes.nombre as size, img.url as imagen from mascotas INNER JOIN estados ON mascotas.estado_id = estados.id INNER JOIN edades ON mascotas.edad_id = edades.id INNER JOIN sizes ON mascotas.size_id = sizes.id LEFT JOIN imagen_mascotas as img ON mascotas.id = img.mascota_id where estados.slug=? and img.prioridad = 1 ", [slugEstado],
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject({
                    data: [],
                    statusCode: status,
                    error: '',
                    message: 'ha ocurrido un error al consultar las mascotas de esta categoría',
                })
            } else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: 'Listado de mascotas de esta categoria',
                })
            }
        }
    )
})
);

module.exports = { estadoIndex }