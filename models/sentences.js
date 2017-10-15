'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sentences = sequelize.define('sentences', {
    words: DataTypes.TEXT,
    coded: DataTypes.TEXT,
    complexity_id: DataTypes.INTEGER,
    keywords: DataTypes.STRING
  };
  Pronouns_personal.associate = function(models) {
    Sentences.belongsTo(models.sentence_complexity, {foreignKey: 'type_id'});
  };
  return Sentences;
};