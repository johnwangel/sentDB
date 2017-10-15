'use strict';
module.exports = (sequelize, DataTypes) => {
  var Number = sequelize.define('number', {
    type: DataTypes.STRING
  };
  Number.associate = function(models) {
      Number.hasMany(models.pronouns_other, {foreignKey: 'number_id'});
      Number.hasMany(models.pronouns_personal, {foreignKey: 'number_id'});
  });
  return Number;
};