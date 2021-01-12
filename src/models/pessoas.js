'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id'
      })
    }
  }

  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validateName: nome => {
          if (nome.length < 3) throw new Error('O nome deve ter mai que 3 caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type:DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'E-mail invalido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      all: { where: {} }
    }
  })
  return Pessoas
}