'use strict';
module.exports = (sequelize, DataTypes) => {
  var prepositions = sequelize.define('prepositions', {
    word: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return prepositions;
};