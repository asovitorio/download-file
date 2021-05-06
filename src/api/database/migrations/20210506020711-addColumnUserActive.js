'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.addColumn('users', 'active',{
      type:Sequelize.DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:true,
      before:'client_id'
     });
     
    
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.removeColumn('users','active');
     
  }
};
