const { Op } = require('sequelize')
const database = require('../models')

module.exports = {
  async findAllNiveis(req, res) {
    try {
      const niveis = await database.Niveis.findAll()
      return res.status(200).json(niveis)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async findOneNiveis(req, res) {
    const { id } = req.params

    try {
      const niveis = await database.Niveis.findOne({ where: { id } })
      if (niveis) return res.status(200).json(niveis)
      return res.status(404).json({ pessoas: 'Não encontrado' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async createNiveis(req, res) {
    const { descr_nivel } = req.body
    if (!descr_nivel) return res.status(400).json({
      message: 'Campos inválidos',
      require: {
        body: {
          descr_nivel: 'String'
        }
      }
    })

    try {
      const niveis = await database.Niveis.create({ descr_nivel: descr_nivel })
      return res.status(201).json(niveis)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async updateNiveis(req, res) {
    const { id, descr_nivel } = req.body
    if (!id || !descr_nivel) return res.status(400).json({
      message: 'Campos inválidos',
      require: {
        body: {
          id: 'Integer',
          descr_nivel: 'String'
        }
      }
    })

    try {
      const niveis = await database.Niveis.update({ descr_nivel },
        { where: { id: id } })

      if (niveis[0] === 0) return res.status(404).json({ niveis: 'Não encontrado' })

      const niveisAtualizado = await database.Niveis.findOne({ where: { id: id } })
      return res.status(200).json({ message: 'Alterado com sucesso', niveis: niveisAtualizado })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async destroyNiveis(req, res) {
    const { id } = req.params

    try {
      const niveis = await database.Niveis.destroy({ where: { id } })

      if (niveis === 0) return res.status(404).json({ niveis: 'Não encontrado' })
      return res.status(200).json({ niveis: 'Apagado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}