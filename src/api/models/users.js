'use strict';

module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define('User',{
    name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    active:DataTypes.BOOLEAN,
    email: DataTypes.STRING,

  }, {
    timestamps: true,
    underscored: true,
      tableName: 'users'
  });

 User.associate = (models) => {
   User.belongsTo(models.Client,{
    foreignKey: "client_id",
    as: "client",
   })
};
  return User;
};