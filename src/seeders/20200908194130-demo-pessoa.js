'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'William Gabriel',
        ativo: true,
        email: 'william007.gabriel@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'taty',
        ativo: true,
        email: 'taty@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pessoas', [{

    }], {})
  }
};
