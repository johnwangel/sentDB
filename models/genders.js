'use strict';
module.exports = (sequelize, DataTypes) => {
  var Gender = sequelize.define('genders', {
    type: DataTypes.STRING
  });
  Gender.associate = function(models) {
      Gender.hasMany(models.pronouns_personals, {foreignKey: 'gender_id'});
  };
  return Gender;
};