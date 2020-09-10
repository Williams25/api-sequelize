'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Niveis', [
      {
        descr_nivel: 'ADM'
      },
      {
        descr_nivel: 'EX'
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {

  }
};
