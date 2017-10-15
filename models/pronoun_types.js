'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pronoun_types = sequelize.define('pronoun_types', {
    type: DataTypes.STRING
  });
  Pronoun_types.associate = function(models) {
      Pronoun_types.hasMany(models.pronouns_other, {foreignKey: 'type1_id'});
      Pronoun_types.hasMany(models.pronouns_other, {foreignKey: 'type2_id'});
   };
  return Pronoun_types;
};