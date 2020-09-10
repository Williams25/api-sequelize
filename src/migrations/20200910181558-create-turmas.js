'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Turmas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_inicio: {
        type: Sequelize.DATEONLY
      },
      docente_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Pessoas',
          key: 'id'
        }
      },
      nivel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Niveis',
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
    await queryInterface.dropTable('Turmas');
  }
};