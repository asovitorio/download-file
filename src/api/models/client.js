'use strict';

module.exports = (sequelize, DataTypes) => {

  const Client = sequelize.define('Client', {
    company: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    andress: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    uf: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true,
    paranoide:true,
    tableName: 'clients'
  });
  Client.associate = (models) =>{
   Client.hasOne(models.User, {
      foreignKey: "client_id",
      as: "client",
      });
   Client.hasOne(models.PathFile, {
      foreignKey: "client_id",
      as: "path_file",
      });
    };
  
  return Client;
};