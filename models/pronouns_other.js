'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pronouns_other = sequelize.define('pronouns_other', {
    word: DataTypes.STRING,
    type1_id: DataTypes.INTEGER,
    type2_id: DataTypes.INTEGER,
    number_id: DataTypes.INTEGER
  };
  Pronouns_other.associate = function(models) {
    Pronouns_other.belongsTo(models.pronoun_types, {foreignKey: 'type_id', as: 'type1_id'};
    Pronouns_other.belongsTo(models.pronoun_types, {foreignKey: 'type_id', as: 'type2_id'};
    Pronouns_other.belongsTo(models.number, {foreignKey: 'number_id'});
  };
  return Pronouns_other;
};