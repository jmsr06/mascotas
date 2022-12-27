const edadesIndex = (server) => (new Promise((resolve, reject) => {
    server.mysql.query(
        "select * from edades",
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject(
                    {
                        data: [],
                        statusCode: status,
                        error: '',
                        message: 'ha ocurrido un error al consultar las edades de las mascotas',
                    }
                )
            }
            else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: 'Listado de edades de las mascotas',
                })
            }
        }
    )
}))




module.exports = { edadesIndex }