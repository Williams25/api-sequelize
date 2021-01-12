const { Router } = require('express')
const routes = Router()

const turmas = require('../controllers/TurmasController')

routes.get('/', turmas.findAllTurmas)
routes.get('/:id', turmas.findOneTurmas)
routes.post('/', turmas.createTurmas)
routes.post('/:id', turmas.restore)
routes.put('/', turmas.updateTurmas)
routes.delete('/:id', turmas.destroyTurmas)

module.exports = routes