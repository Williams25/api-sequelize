'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matriculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      estudante_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Pessoas',
          key: 'id'
        }
      },
      turma_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Turmas',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date()
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matriculas');
  }
};