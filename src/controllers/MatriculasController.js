const { Op } = require('sequelize')
const database = require('../models')

module.exports = {
  async findAllMatriculas(req, res) {
    try {
      const matriculas = await database.Matriculas.findAll()
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async findOneMatriculas(req, res) {
    const { id } = req.params

    try {
      const matriculas = await database.Matriculas.findOne({ where: { id } })
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async createMatriculas(req, res) {
    const { status, estudante_id, turma_id } = req.body
    if (!status || !estudante_id || !turma_id) return res.status(400).json({
      message: 'Campos inválidos',
      require: {
        body: {
          status: 'String',
          estudante_id: 'Integer',
          turma_id: 'Integer',
        }
      }
    })

    try {
      const matriculas = await database.Matriculas.create({ status, estudante_id, turma_id })
      return res.status(201).json(matriculas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async updateMatriculas(req, res) {
    const { status, estudante_id, turma_id, id } = req.body
    if (!status || !estudante_id || !turma_id || !id) return res.status(400).json({
      message: 'Campos inválidos',
      require: {
        body: {
          id: 'Integer',
          status: 'String',
          estudante_id: 'Integer',
          turma_id: 'Integer',
        }
      }
    })
    try {
      const matriculas = await database.Matriculas.update({ status, estudante_id, turma_id },
        { where: { id } })

      if (matriculas[0] === 0) return res.status(404).json({ matriculas: 'Não encontrado' })

      const matriculasAtualizada = await database.Matriculas.findOne({ where: { id } })
      return res.status(200).json({ message: 'Alterado com sucesso', matriculas: matriculasAtualizada })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async destroyMatriculas(req, res) {
    const { id } = req.params

    try {
      const matriculas = await database.Matriculas.destroy({ where: { id } })

      if (matriculas === 0) return res.status(404).json({ matriculas: 'Não encontrado' })
      return res.status(200).json({ matriculas: 'Apagado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async restore(req, res) {
    const { id } = req.params

    try {
      await database.Matriculas.restore({ where: { id: id } })
      return res.status(200).json({ message: 'Cadastro restaurado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}