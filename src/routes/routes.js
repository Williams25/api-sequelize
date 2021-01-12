const { Router } = require('express')
const routes = Router()

const pessoas = require('./PessoasRouter')
const niveis = require('./NiveisRouter')
const turmas = require('./TurmasRouter')
const matriculas = require('./MatriculasRouter')


routes.use('/pessoas', pessoas)
routes.use('/niveis', niveis)
routes.use('/turmas', turmas)
routes.use('/matriculas', matriculas)

module.exports = routes