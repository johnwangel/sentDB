'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sentence_complexity = sequelize.define('sentence_complexity', {
    complexity: DataTypes.STRING
  };
  Pronoun_types.associate = function(models) {
      Sentence_complexity.hasMany(models.sentences, {foreignKey: 'type_id'});
   });
  return Sentence_complexity;
};