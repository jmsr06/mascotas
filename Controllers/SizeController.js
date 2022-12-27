const sizesIndex = (server) => (new Promise((resolve, reject) => {
    server.mysql.query(
        "select * from sizes",
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject(
                    {
                        data: [],
                        statusCode: status,
                        error: '',
                        message: 'ha ocurrido un error al consultar los tamaños de las mascotas',
                    }
                )
            }
            else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: 'Listado de tamaños de las mascotas',
                })
            }
        }
    )
}))




module.exports = { sizesIndex }