'use strict';
module.exports = (sequelize, DataTypes) => {
  var Interjections = sequelize.define('interjections', {
    word: DataTypes.STRING
  };
  return Interjections;
};