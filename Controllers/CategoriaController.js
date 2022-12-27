const categoriasIndex = (server) => (new Promise((resolve, reject) => {
    server.mysql.query(
        "select * from categorias",
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject(
                    {
                        data: [],
                        statusCode: status,
                        error: '',
                        message: 'ha ocurrido un error al consultar las mascotas de esta categoría',
                    }
                )
            }
            else {
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
}))


const categoriaMascotas = (server, slugEstado, params) => (new Promise((resolve, reject) => {
    let query = "select mascotas.*, estados.nombre as estado, edades.nombre as edad, sizes.nombre as size, img.url as imagen from mascotas INNER JOIN estados ON mascotas.estado_id = estados.id INNER JOIN edades ON mascotas.edad_id = edades.id INNER JOIN categorias ON mascotas.categoria_id = categorias.id  INNER JOIN sizes ON mascotas.size_id = sizes.id LEFT JOIN imagen_mascotas as img ON mascotas.id = img.mascota_id where estados.slug=? and img.prioridad = 1 ";
    let parametros = [slugEstado]
    if(params.categoria){
        query += " and mascotas.categoria_id=?"
        parametros.push(params.categoria)
    }
    if(params.size){
        query += " and mascotas.size_id=?"
        parametros.push(params.size)
    }
    if(params.edad){
        query += " and mascotas.edad_id=?"
        parametros.push(params.edad)
    }
    if(params.sexo){
        query += " and mascotas.sexo_id=?"
        parametros.push(params.sexo)
    }
    if(params.esterilizacion){
        query += " and mascotas.esterilizacion=?"
        parametros.push(params.esterilizacion)
    }

    server.mysql.query(
        query, parametros,
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject(
                    {
                        data: [],
                        statusCode: status,
                        error: '',
                        message: 'ha ocurrido un error al consultar las mascotas de esta categoría',
                    }
                )
            }
            else {
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
}))


module.exports = { categoriasIndex, categoriaMascotas }