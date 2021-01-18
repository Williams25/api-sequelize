const { Router } = require('express')
const routes = Router()

const matriculas = require('../controllers/MatriculasController')

routes.get('/', matriculas.findAllMatriculas)
routes.get('/:id', matriculas.findOneMatriculas)
routes.get('/:id/estudante', matriculas.findOneMatriculasEstudantes)
routes.get('/:id/turmas', matriculas.findOneMatriculasTurmas)
routes.get('/turmas/lotada', matriculas.findMatriculasTurmasLimit)
routes.post('/', matriculas.createMatriculas)
routes.post('/:id', matriculas.restore)
routes.put('/', matriculas.updateMatriculas)
routes.delete('/:id', matriculas.destroyMatriculas)

module.exports = routes