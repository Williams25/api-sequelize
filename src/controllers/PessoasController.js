const { Op } = require('sequelize')
const database = require('../models')

module.exports = {
  async findAll(req, res) {
    try {
      const pessoas = await database.Pessoas.scope('all').findAll()
      const response = pessoas.map(pessoas => {
        return {
          id: pessoas.id,
          nome: pessoas.nome,
          email: pessoas.email,
          role: pessoas.role,
          ativo: pessoas.ativo,
          createdAt: pessoas.createdAt,
          updatedAt: pessoas.updatedAt,
          deletedAt: pessoas.deletedAt
        }
      })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async findAllAtivo(req, res) {
    try {
      const pessoas = await database.Pessoas.findAll()
      const response = pessoas.map(pessoas => {
        return {
          id: pessoas.id,
          nome: pessoas.nome,
          email: pessoas.email,
          role: pessoas.role,
          ativo: pessoas.ativo,
          createdAt: pessoas.createdAt,
          updatedAt: pessoas.updatedAt,
          deletedAt: pessoas.deletedAt
        }
      })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async findOnePessoas(req, res) {
    const { id } = req.params

    try {
      const pessoas = await database.Pessoas.findOne({ where: { id: id } })
      if (pessoas) return res.status(200).json(pessoas)
      return res.status(404).json({ message: 'Não encontrado' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async createPessoas(req, res) {
    const { nome, email, role, ativo } = req.body

    if (!nome || !email || !role || !ativo) return res.status(400).json({
      message: 'Campos inválidos',
      require: {
        body: {
          nome: 'String',
          email: 'String',
          role: 'String',
          ativo: 'Boolean'
        }
      }
    })

    try {
      const pessoas = await database.Pessoas.create({ nome, email, role, ativo })

      return res.status(201).json(pessoas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async updatePessoas(req, res) {
    const { nome, email, role, ativo, id } = req.body

    if (!nome || !email || !role || !ativo || !id) return res.status(400).json({
      message: 'Campos inválidos',
      require: {
        body: {
          nome: 'String',
          email: 'String',
          role: 'String',
          ativo: 'Boolean'
        }
      }
    })

    try {
      const pessoas = await database.Pessoas.update({ nome, email, role, ativo },
        { where: { id: id } })

      if (pessoas[0] === 0) return res.status(404).json({ pessoas: 'Não encontrado' })

      const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: id } })

      return res.status(200).json({ message: 'Alterado com sucesso', pessoa: pessoaAtualizada })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async destroyPessoas(req, res) {
    const { id } = req.params

    try {
      const pessoas = await database.Pessoas.destroy({ where: { id: id } })

      if (pessoas === 0) return res.status(404).json({ pessoas: 'Não encontrado' })

      return res.status(200).json({ message: 'Apagado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async restore(req, res) {
    const { id } = req.params

    try {
      await database.Pessoas.restore({ where: { id: id } })
      return res.status(200).json({ message: 'Cadastro restaurado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}