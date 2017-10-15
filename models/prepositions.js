'use strict';
module.exports = (sequelize, DataTypes) => {
  var prepositions = sequelize.define('prepositions', {
    word: DataTypes.STRING
  });
  return prepositions;
};