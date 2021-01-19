const pessoasServices = require('./PessoasServices')
const matriculasServices = require('./MatriculasServices')
const niveisServices = require('./NiveisServices')
const turmasServices = require('./TurmasServices')

module.exports = {
  PessoasServices: new pessoasServices(),
  MatriculasServices: new matriculasServices(),
  NiveisServices: new niveisServices(),
  TurmasServices: new turmasServices(),
}