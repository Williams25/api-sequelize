const { Op } = require('sequelize')
const database = require('../models')

module.exports = {
  async findAllTurmas(req, res) {
    const { data_inicial, data_final } = req.query

    const where = {}

    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
    data_final ? where.data_inicio[Op.lte] = data_final : null

    try {
      const turmas = await database.Turmas.findAll({ where })
      return res.status(200).json(turmas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async findOneTurmas(req, res) {
    const { id } = req.params

    try {
      const turmas = await database.Turmas.findOne({ where: { id } })
      if (turmas) return res.status(200).json(turmas)
      return res.status(404).json({ pessoas: 'Não encontrado' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async createTurmas(req, res) {
    const { data_inicio, nivel_id, docente_id } = req.body

    if (!data_inicio || !nivel_id || !docente_id) return res.status(400).json({
      message: 'Campos inválidos',
      require: {
        body: {
          data_inicio: 'String',
          nivel_id: 'Integer',
          docente_id: 'Integer',
        }
      }
    })

    try {
      const turmas = await database.Turmas.create({ data_inicio, nivel_id, docente_id })
      return res.status(201).json(turmas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async updateTurmas(req, res) {
    const { data_inicio, nivel_id, docente_id, id } = req.body

    if (!data_inicio || !nivel_id || !docente_id || !id) return res.status(400).json({
      message: 'Campos inválidos',
      require: {
        body: {
          id: 'Integer',
          nivel_id: 'Integer',
          docente_id: 'Integer',
          data_inicio: 'String'
        }
      }
    })

    try {
      const turmas = await database.Turmas.update({ data_inicio, nivel_id, docente_id },
        { where: { id } })

      if (turmas[0] === 0) return res.status(404).json({ turmas: 'Não encontrado' })

      const turmasAtualizada = await database.Turmas.findOne({ where: { id } })
      return res.status(200).json({ message: 'Alterado com sucesso', turmas: turmasAtualizada })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async destroyTurmas(req, res) {
    const { id } = req.params

    try {
      const turmas = await database.Turmas.destroy({ where: { id } })

      if (turmas === 0) return res.status(404).json({ turmas: 'Não encontrado' })
      return res.status(200).json({ turmas: 'Apagado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async restore(req, res) {
    const { id } = req.params

    try {
      await database.Turmas.restore({ where: { id: id } })
      return res.status(200).json({ message: 'Cadastro restaurado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}