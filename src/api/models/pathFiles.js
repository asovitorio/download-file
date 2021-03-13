'use strict';
module.exports = (sequelize, DataTypes) => {
  const PathFile = sequelize.define('PathFile',{
    date: DataTypes.DATE,
    path: DataTypes.STRING,
    download: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    report_id: DataTypes.INTEGER
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'path_files',
  });
  
  PathFile.associate = (models) => {
    PathFile.belongsTo(models.Report,{
     foreignKey: "report_id",
     as: "report",
    })
 
    PathFile.belongsTo(models.Client,{
     foreignKey: "client_id",
     as: "client",
    })
 };

  return PathFile;
};