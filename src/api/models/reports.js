'use strict';
const {
  Model
} = require('sequelize');
module.exports =  (sequelize, DataTypes) => {
 const Report = sequelize.define('Report',{
    name: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true,
    paranoide:true,
    tableName: 'reports'
  });
  Report.associate = (models) => {
    Report.hasOne(models.PathFile, {
      foreignKey: "report_id",
     as: "path_file",
      });
  };
  return Report;
};