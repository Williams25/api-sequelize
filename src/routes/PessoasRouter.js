const express = require('express')
const routes = express.Router()

const pessoas = require('../controllers/PessoasController')

routes.get('/pessoas', pessoas.findAllPessoas)
routes.get('/pessoas/:id', pessoas.findOnePessoas)
routes.post('/pessoas', pessoas.createPessoas)
routes.put('/pessoas', pessoas.updatePessoas)
routes.delete('/pessoas/:id', pessoas.destroyPessoas)

module.exports = routes