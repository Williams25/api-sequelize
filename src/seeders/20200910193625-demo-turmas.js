'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Turmas', [
      {
        data_inicio: new Date(),
        docente_id: 6,
        nivel_id: 1,
      },
      {
        data_inicio: new Date(),
        docente_id: 4,
        nivel_id: 2,
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {

  }
};
