'use strict';
const bcryptjs = require('bcryptjs')
require('dotenv').config()

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [{
      name: 'Alessandro',
      user_name: 'asovitorio',
      password: bcryptjs.hashSync(process.env.PASS_USER, 8),
      status: 1,
      client_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
   
  ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('users', null, {});

  }
};