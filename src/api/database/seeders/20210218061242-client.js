'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clients', [{

      company: "AleDev ltda",
      cnpj: '01010100.0001/09',
      email: 'asovitorio@gmail.com',
      telephone: '11954965202',
      zip_code: '05797-440',
      andress: 'Rua Silvio Gallicho,27',
      district: 'Jd. Ipê',
      city: 'São Paulo',
      uf: 'SP',
      created_at:new Date(),
      updated_at:new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('clients', null, {});

  }
};