const database = require('../models')

class Services {
  constructor(model) {
    this.model = model
  }

  async findAll() {
    return await database[this.model].findAll()
  }

  async findById(id) {
    return await database[this.model].findOne({ where: { id } })
  }

  async findCountAll(where = {}, params) {
    return await database[this.model].findAndCountAll({ where: { ...where }, ...params })
  }

  async create(data = {}) {
    await database[this.model].create(data)
  }

  async update(data, id) {
    console.log(data, id)
    return await database[this.model].update(data, { where: { id: id } })
  }

  async delete(id) {
    return await database[this.model].destroy({ where: { id } })
  }

  async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    return database[this.model]
      .update(dadosAtualizados, { where: { ...where } }, transacao)
  }

  async restore(id) {
    return await database[this.model].restore({ where: { id } })
  }
}

module.exports = Services