'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sentences = sequelize.define('sentences', {
    words: DataTypes.TEXT,
    coded: DataTypes.JSON,
    complexity_id: DataTypes.INTEGER,
    keywords: DataTypes.STRING
  });
  Sentences.associate = function(models) {
    Sentences.belongsTo(models.sentence_complexity, {foreignKey: 'id'});
  };
  return Sentences;
};