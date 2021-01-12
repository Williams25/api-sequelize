const { Router } = require('express')
const routes = Router()

const niveis = require('../controllers/NiveisController')

routes.get('/', niveis.findAllNiveis)
routes.get('/:id', niveis.findOneNiveis)
routes.post('/', niveis.createNiveis)
routes.post('/:id', niveis.restore)
routes.put('/', niveis.updateNiveis)
routes.delete('/:id', niveis.destroyNiveis)

module.exports = routes