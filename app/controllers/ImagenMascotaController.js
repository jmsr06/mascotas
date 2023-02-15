require('module-alias/register') // ALIAS
//Models
const ImagenMascota = require('@models/ImagenMascota');

class ImagenMascotaController {

    static async mascotasImagenes(request, reply, arrayImages, id_mascota) {
        for (let i = 0; i < arrayImages.length; i++) {
            if (id_mascota != 0) {
                try {
                    const response = {
                        statusCode: 0,
                        message: '',
                        data: []
                    };
                    let newImage = {url:arrayImages[i], prioridad:i+1, mascota_id:id_mascota}
                    const imagenMascota = await ImagenMascota.query().insert(newImage)
                    response.statusCode = 200
                    response.message = 'OK'
                    response.data = imagenMascota;
                    reply.send(response);
                } catch (err) {
                    console.log(err)
                    reply.send({
                        statusCode: 500,
                        message: 'Server error',
                        data: []
                    });
                }
            }
        }
    }
}

module.exports = ImagenMascotaController