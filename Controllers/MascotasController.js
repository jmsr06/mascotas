const slugLibrary = require('slug');
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.locale('es');
dayjs.extend(utc);
dayjs.extend(timezone);

const mascotasIndex = (server) => (new Promise((resolve, reject) => {
    server.mysql.query(
        'select * from mascotas',
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject({
                    data: [],
                    statusCode: status,
                    error: '',
                    message: 'ha ocurrido un error al consultar las mascotas',
                })
            } else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: 'Listado de mascotas',
                })
            }
        }
    )
})
);

// const mascotasStore = (server, { nombre }) => (new Promise((resolve, reject) => {
//     const slug = slugLibrary(nombre)
//     server.mysql.query(
//         'insert into mascotas (nombre, slug, sexo, descripcion, esterilizacion, categoria_id, size_id, edad_id, ciudad_id, fundacion_id, ) values (?, ?)', [nombre, slug],
//         (error, res) => {
//             let status
//             if (error) {
//                 status = 500
//                 reject({
//                     data: [],
//                     statusCode: status,
//                     error: '',
//                     message: 'ha ocurrido un error al insertar la ciudad',
//                 })
//             } else {
//                 status = 201
//                 resolve({
//                     data: res,
//                     statusCode: status,
//                     error: '',
//                     message: 'Ciudad agregada exitosamente',
//                 })
//             }
//         }
//     )
// }))

// const mascotaUpdate = (server, { nombre }, id) => (new Promise((resolve, reject) => {
//     const slug = slugLibrary(nombre)
//     const fecha = dayjs().format('YYYY-MM-DD H:m:s')
//     server.mysql.query(
//         'update ciudades set nombre = ? , slug = ?, updated_at = ? where id = ?', [nombre, slug, fecha, id],
//         (error, res) => {
//             let status
//             if (error) {
//                 status = 500
//                 reject({
//                     data: [],
//                     statusCode: status,
//                     error: '',
//                     message: 'ha ocurrido un error al modificar la ciudad',
//                 })
//             } else {
//                 status = res.affectedRows > 0 ? 201 : 200
//                 resolve({
//                     data: res,
//                     statusCode: status,
//                     error: '',
//                     message: res.affectedRows > 0 ? 'Ciudad modificada exitosamente' : 'Ciudad no encontrada',
//                 })
//             }
//         }
//     )
// }))

const getMascota = (server, slug) => (new Promise((resolve, reject) => {
    server.mysql.query(
        "select mascotas.*, fundaciones.nombre as fundacion, fundaciones.slug as fundacion_slug, fundaciones.telefono as telefono, ciudades.nombre as ciudad, estados.nombre as estado, edades.nombre as edad, sizes.nombre as size from mascotas INNER JOIN estados ON mascotas.estado_id = estados.id INNER JOIN edades ON mascotas.edad_id = edades.id INNER JOIN sizes ON mascotas.size_id = sizes.id INNER JOIN ciudades ON mascotas.ciudad_id = ciudades.id INNER JOIN fundaciones ON mascotas.fundacion_id = fundaciones.id where mascotas.slug=? ", [slug],
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject({
                    data: [],
                    statusCode: status,
                    error: '',
                    message: 'ha ocurrido un error al consultar la mascota',
                })
            } else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: res.length > 0 ? 'Mascota encontrada' : 'Mascota no encontrada',
                })
            }
        }
    )
}
))

const getImagenes = (server, id) => (new Promise((resolve, reject) => {
    server.mysql.query(
        "select prioridad, url from imagen_mascotas where mascota_id=? order by prioridad asc", [id],
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject({
                    data: [],
                    statusCode: status,
                    error: '',
                    message: 'ha ocurrido un error al consultar las imagenes',
                })
            } else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: res.length > 0 ? 'Imagenes encontrada' : 'Imagenes no encontrada',
                })
            }
        }
    )
}
))

const getMascotaFundacion = (server, fundacionSlug, estadoSlug) => (new Promise((resolve, reject) => {
    // console.log(fundacionSlug, 'hola', estadoSlug)
    server.mysql.query(
        "select mascotas.*, imagen_mascotas.url as imagen, fundaciones.slug as fundacion_slug, ciudades.nombre as ciudad, estados.nombre as estado, edades.nombre as edad, sizes.nombre as size from mascotas INNER JOIN estados ON mascotas.estado_id = estados.id INNER JOIN edades ON mascotas.edad_id = edades.id INNER JOIN sizes ON mascotas.size_id = sizes.id INNER JOIN ciudades ON mascotas.ciudad_id = ciudades.id INNER JOIN fundaciones ON mascotas.fundacion_id = fundaciones.id INNER JOIN imagen_mascotas ON mascotas.id = imagen_mascotas.mascota_id  where fundaciones.slug=? and estados.slug=? and imagen_mascotas.prioridad=1", [fundacionSlug, estadoSlug],
        (error, res) => {
            console.log(res)
            let status
            if (error) {
                status = 500
                reject({
                    data: [],
                    statusCode: status,
                    error: '',
                    message: 'ha ocurrido un error al consultar laS mascota',
                })
            } else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: res.length > 0 ? 'Mascotas encontradas' : 'Mascotas no encontradas',
                })
            }
        }
    )
}
))


const mascotaRemove = (server, slug) => (new Promise((resolve, reject) => {
    server.mysql.query(
        'delete from mascotas where slug=?', [slug],
        (error, res) => {
            let status
            if (error) {
                status = 500
                reject({
                    data: [],
                    statusCode: status,
                    error: '',
                    message: 'ha ocurrido un error al eliminar la ciudad',
                })
            } else {
                status = 200
                resolve({
                    data: res,
                    statusCode: status,
                    error: '',
                    message: res.affectedRows >= 1 ? 'Ciudad eliminada' : 'Ciudad no encontrada',
                })
            }
        }
    )
}))

module.exports = { mascotasIndex, getMascota, getImagenes, getMascotaFundacion, mascotaRemove }