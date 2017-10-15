'use strict';
module.exports = (sequelize, DataTypes) => {
  var Gender = sequelize.define('gender', {
    type: DataTypes.STRING
  };
  Gender.associate = function(models) {
      Gender.hasMany(models.pronouns_personal, {foreignKey: 'gender_id'});
  });
  return Gender;
};