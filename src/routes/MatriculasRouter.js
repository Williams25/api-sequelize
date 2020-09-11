const { Router } = require('express')
const routes = Router()

const matriculas = require('../controllers/MatriculasController')

routes.get('/', matriculas.findAllMatriculas)
routes.get('/:id', matriculas.findOneMatriculas)
routes.post('/', matriculas.createMatriculas)
routes.put('/', matriculas.updateMatriculas)
routes.delete('/:id', matriculas.destroyMatriculas)

module.exports = routes