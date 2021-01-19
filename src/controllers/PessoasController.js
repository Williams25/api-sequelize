const { PessoasServices } = require('../services')
// const PessoasServices = new pessoasServices()

module.exports = {
  async findAll(req, res) {
    try {
      const pessoas = await PessoasServices.findAllPessoas()
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
      const pessoas = await PessoasServices.findAllAtivos()
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
      const pessoas = await PessoasServices.findById(id)
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
      const pessoas = await PessoasServices.create(req.body)

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
      const pessoas = await PessoasServices.update(req.body, id)

      if (pessoas[0] === 0) return res.status(404).json({ pessoas: 'Não encontrado' })

      const pessoaAtualizada = await PessoasServices.findById(id)

      return res.status(200).json({ message: 'Alterado com sucesso', pessoa: pessoaAtualizada })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async destroyPessoas(req, res) {
    const { id } = req.params

    try {
      const pessoas = await PessoasServices.delete(id)

      if (pessoas === 0) return res.status(404).json({ pessoas: 'Não encontrado' })

      return res.status(200).json({ message: 'Apagado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  async restore(req, res) {
    const { id } = req.params

    try {
      await PessoasServices.restore(id)
      return res.status(200).json({ message: 'Cadastro restaurado com sucesso' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}