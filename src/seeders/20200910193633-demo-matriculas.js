'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Matriculas',[
      {
        status: 'Cursando',
        estudante_id: 6,
        turma_id: 1,
      },
      {
        status: 'Cursando',
        estudante_id: 5,
        turma_id: 2,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {

  }
};
