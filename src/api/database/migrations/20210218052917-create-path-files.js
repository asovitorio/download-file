'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('path_files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      path: {
        type: Sequelize.STRING
      },
      download: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.STRING
      },
      client_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
        references:{
          model:{
            tableName:'clients'
          },
          key:'id'
        }
      },
      report_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
        references:{
          model:{
            tableName:'reports'
          },
          key:'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('path_files');
  }
};