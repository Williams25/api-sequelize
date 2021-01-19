const { Op, Sequelize } = require('sequelize')
const database = require('../models')

const { MatriculasServices, PessoasServices } = require('../services')

module.exports = {
  async findAllMatriculas(req, res) {
    try {
      const matriculas = await MatriculasServices.findAll()
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async findOneMatriculas(req, res) {
    const { id } = req.params

    try {
      const matriculas = await MatriculasServices.findById(id)
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async findOneMatriculasEstudantes(req, res) {
    const { id } = req.params

    try {
      const pessoa = await database.Pessoas.findOne({ where: { id } })
      const matriculas = await pessoa.getAulasMatriculadas()
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async findOneMatriculasTurmas(req, res) {
    const { id } = req.params

    try {
      const matriculas = await MatriculasServices.findCountAll({ turma_id: id, status: 'confirmado' },
        {
          limit: 20,
          order: [['estudante_id', 'ASC']],
        })
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async findMatriculasTurmasLimit(req, res) {
    const lotacao = 4
    try {
      const tumasLotadas = await MatriculasServices.findCountAll({ status: 'confirmado' },
        {
          attributes: ['turma_id'],
          group: ['turma_id'],
          having: Sequelize.literal(`count(turma_id) >= ${lotacao}`),
        })
      return res.status(200).json(tumasLotadas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async cancelarMatricula(req, res) {
    const { estudante_id } = req.params
    try {
      await PessoasServices.cancelarMatricula(estudante_id)
      return res.status(200).json({ message: 'Matricula cancelada' })
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
      const matriculas = await MatriculasServices.create(req.body)
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
      const matriculas = await MatriculasServices.update(req.body, id)

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
      const matriculas = await MatriculasServices.delete(id)

      if (matriculas === 0) return res.status(404).json({ matriculas: 'Não encontrado' })
      return res.status(200).json({ matriculas: 'Apagado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async restore(req, res) {
    const { id } = req.params

    try {
      await MatriculasServices.restore(id)
      return res.status(200).json({ message: 'Cadastro restaurado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}