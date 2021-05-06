'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.addColumn('users', 'email',{
      type:Sequelize.DataTypes.STRING,
     // defaultValue:false,
      allowNull:true,
      after:'user_name'
     });
     
    
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.removeColumn('users','email');
     
  }
};
