require('module-alias/register') // ALIAS
const emailValidator = require('deep-email-validator');
const bcrypt = require("bcrypt");

//Models
const User = require('@models/User');
const Fundacion = require('@models/Fundacion');

class LoginController {

    static async login(request, reply) {
        const response = {
            statusCode: 500,
            message: '',
            data: [],
            error: []
        };
        try {
            const validate = await emailValidator.validate(request.body.email.trim())
            if (!validate.valid) {
                response.statusCode = 400
                response.message = 'error'
                response.error = {
                    "validation": [
                        {
                            "instancePath": "",
                            "schemaPath": "#/email",
                            "keyword": "email",
                            "params": {
                                "missingProperty": "email"
                            },
                            "message": "el email ingresado no es de tipo email"
                        }
                    ],
                    "validationContext": "body"
                }
                throw new Error("Errores de validación.");
            }
            const user = await User.query()
                .findOne({ email: request.body.email.trim() })
            if (user == undefined) {
                response.statusCode = 400
                response.message = 'error'
                response.error = {
                    "validation": [
                        {
                            "instancePath": "",
                            "schemaPath": "#/email",
                            "keyword": "email",
                            "params": {
                                "missingProperty": "email"
                            },
                            "message": "el email ingresado no se encuentra registrado"
                        }
                    ],
                    "validationContext": "body"
                }
                throw new Error("Errores de validación.");
            }
            const match = await bcrypt.compare(request.body.password, user.password);

            if (!match) {
                response.statusCode = 400
                response.message = 'error'
                response.error = {
                    "validation": [
                        {
                            "instancePath": "",
                            "schemaPath": "#/password",
                            "keyword": "password",
                            "params": {
                                "missingProperty": "password"
                            },
                            "message": "La contraseña no coincide"
                        }
                    ],
                    "validationContext": "body"
                }
                throw new Error("Errores de validación.");
            }
            if (!user.token) {
                const token = await reply.jwtSign({
                        id: user.id,
                        email: user.email
                })

                await User.query().patch({
                    token
                })
                .where('id', user.id);
                user.token = token

            }
            const fundacion = await Fundacion.query().findOne({
                user_id : user.id
            })
            user.fundacion = fundacion ? fundacion : null
            response.statusCode = 200
            response.data = user
            reply.status(response.statusCode).send(response)
        } catch (error) {
            console.log(error)
            reply.status(response.statusCode).send(response)
        }
        reply.send('login')
    }

    static async register(request, reply) {
        const response = {
            statusCode: 500,
            message: '',
            data: [],
            error: []
        };
        try {
            const validate = (request.body.email.trim()).includes('@')
            if (!validate) {
                response.statusCode = 400
                response.message = 'error'
                response.error = {
                    "validation": [
                        {
                            "instancePath": "",
                            "schemaPath": "#/email",
                            "keyword": "email",
                            "params": {
                                "missingProperty": "email"
                            },
                            "message": "el email ingresado no es de tipo email"
                        }
                    ],
                    "validationContext": "body"
                }
                throw new Error("Errores de validación.");
            }
            const user = await User.query().select("id")
                .findOne({ email: request.body.email.trim() })
            if (user != undefined) {
                response.statusCode = 400
                response.message = 'error'
                response.error = {
                    "validation": [
                        {
                            "instancePath": "",
                            "schemaPath": "#/email",
                            "keyword": "email",
                            "params": {
                                "missingProperty": "email"
                            },
                            "message": "el email ingresado ya se encuentra registrado"
                        }
                    ],
                    "validationContext": "body"
                }
                throw new Error("Errores de validación.");
            }
            const password = await bcrypt.hash(request.body.password.trim(), 10);

            const usuario = await User.query().insert({
                email: request.body.email.trim(),
                password: password
            });
            const token = await reply.jwtSign({
                id: usuario.id,
                email: usuario.email
            })

            const update = await User.query().patch({
                token
            })
                .where('id', usuario.id);
            usuario.token = token
            usuario.fundacion = null
            response.statusCode = 201
            response.data = usuario
            reply.status(response.statusCode).send(response)
        }
        catch (error) {
            reply.status(response.statusCode).send(response)
        }
    }

    static async logout(request, reply) {
        const response = {
            statusCode: 500,
            message: '',
            data: [],
            error: []
        };
        try {
            await User.query().patch({
                token : null
            })
                .where('id', request.user.id);
            response.statusCode = 200
            response.message = 'LogOut exitoso'
            reply.status(response.statusCode).send(response)
        } catch (error) {
            console.log(error)
            response.message = 'Hubo un error'
            reply.status(response.statusCode).send(response)
        }
        reply.send('login')
    }
}

module.exports = LoginController