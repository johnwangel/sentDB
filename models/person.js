'use strict';
module.exports = (sequelize, DataTypes) => {
  var Person = sequelize.define('person', {
    type: DataTypes.STRING
  });
  Person.associate = function(models) {
      Person.hasMany(models.pronouns_personal, {foreignKey: 'person_id'});
  };
  return Person;
};