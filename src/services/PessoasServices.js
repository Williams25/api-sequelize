const Services = require('./Services')
const database = require('../models')
class PessoasServices extends Services {
  constructor() {
    super('Pessoas')
    this.matriculas = new Services('Matriculas')
  }

  async findAllAtivos(where = {}) {
    return await database[this.model].findAll({ where: { ...where } })
  }

  async findAllPessoas(where = {}) {
    return await database[this.model].scope('all').findAll({ where: { ...where } })
  }

  async cancelarMatricula(estudante_id) {
  return await database.sequelize.transaction(async transaction => {
      await super.atualizaRegistros({ ativo: false }, estudante_id, { transaction })
      await this.matriculas.atualizaRegistros({ status: 'cancelado' }, estudante_id, { transaction })
    })
  }

}

module.exports = PessoasServices