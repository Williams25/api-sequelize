const express = require('express')
const routes = express.Router()

const pessoas = require('./PessoasRouter')

routes.use(pessoas)

module.exports = routes