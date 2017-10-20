'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pronouns_personal = sequelize.define('pronouns_personals', {
    person_id: DataTypes.INTEGER,
    number_id: DataTypes.INTEGER,
    gender_id: DataTypes.INTEGER,
    subjective: DataTypes.STRING,
    objective: DataTypes.STRING,
    possessiveAttributive: DataTypes.STRING,
    possessivePredicate: DataTypes.STRING,
    reflexive: DataTypes.STRING
  });
  Pronouns_personal.associate = function(models) {
    Pronouns_personal.belongsTo(models.persons, {foreignKey: 'person_id'});
    Pronouns_personal.belongsTo(models.numbers, {foreignKey: 'number_id'});
    Pronouns_personal.belongsTo(models.genders, {foreignKey: 'gender_id'});
  };
  return Pronouns_personal;
};