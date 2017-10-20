'use strict';
module.exports = (sequelize, DataTypes) => {
  var Person = sequelize.define('persons', {
    type: DataTypes.STRING
  });
  Person.associate = function(models) {
      Person.hasMany(models.pronouns_personals, {foreignKey: 'person_id'});
  };
  return Person;
};