const { Router } = require('express')
const routes = Router()

const pessoas = require('../controllers/PessoasController')

routes.get('/', pessoas.findAllPessoas)
routes.get('/:id', pessoas.findOnePessoas)
routes.post('/', pessoas.createPessoas)
routes.post('/:id', pessoas.restore)
routes.put('/', pessoas.updatePessoas)
routes.delete('/:id', pessoas.destroyPessoas)

module.exports = routes