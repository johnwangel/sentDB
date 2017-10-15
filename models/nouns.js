'use strict';
module.exports = (sequelize, DataTypes) => {
  var nouns = sequelize.define('nouns', {
    word: {
        type: DataTypes.STRING,
        allowNull: false
      },
    isPlural: DataTypes.BOOLEAN,
    plural: DataTypes.STRING
  });
  return nouns;
};