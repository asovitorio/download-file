'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('reports', [{
        name: 'IRRF',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Balanço Patrimonial (BP)',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Demonstração do Resultado do Exercício (DRE)',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Demonstração de Lucros ou Prejuízos Acumulados (DLPA)',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('reports', null, {});

  }
};