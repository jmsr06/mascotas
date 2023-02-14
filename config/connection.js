const knex = require('knex')
const dataconfig = require('@config/app')
module.exports = knex(dataconfig[process.env.DB_CONNECTION])