'use strict';
module.exports = (sequelize, DataTypes) => {
  var Stamps = sequelize.define('stamps', {
    title: DataTypes.STRING,
    pos: DataTypes.STRING,
    value: DataTypes.INTEGER,
    description: DataTypes.TEXT
  })

  return Stamps;
};