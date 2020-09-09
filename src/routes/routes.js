const express = require('express')
const routes = express.Router()

routes.use('/produto', (req, res) => res.status(200).send({mensagem: 'entro'}))

module.exports = routes