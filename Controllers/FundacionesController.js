const slugLibrary = require('slug');
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.locale('es');
dayjs.extend(utc);
dayjs.extend(timezone);

const fundacionesIndex = (server) => (new Promise((resolve, reject) => {
    server.mysql.query(
        'select fundaciones.*, ciudades.nombre as ciudad from fundaciones INNER JOIN ciudades ON fundaciones.ciudad_id = ciudades.id',
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject({
                    data: [],
                    statusCode: status,
                    error: '',
                    message: 'ha ocurrido un error al consultar las fundaciones',
                })
            } else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: 'Listado de fundaciones',
                })
            }
        }
    )
})
);

const getFundacion = (server, slug) => (new Promise((resolve, reject) => {
    server.mysql.query(
        "select fundaciones.*, ciudades.nombre as ciudad from fundaciones INNER JOIN ciudades ON fundaciones.ciudad_id = ciudades.id where fundaciones.slug=? ", [slug],
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject({
                    data: [],
                    statusCode: status,
                    error: '',
                    message: 'ha ocurrido un error al consultar la fundacion',
                })
            } else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: res.length > 0 ? 'fundacion encontrada' : 'fundacion no encontrada',
                })
            }
        }
    )
}
))

module.exports = { fundacionesIndex, getFundacion }