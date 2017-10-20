'use strict';
module.exports = (sequelize, DataTypes) => {
  var Number = sequelize.define('numbers', {
    type: DataTypes.STRING
  });
  Number.associate = function(models) {
      Number.hasMany(models.pronouns_others, {foreignKey: 'number_id'});
      Number.hasMany(models.pronouns_personals, {foreignKey: 'number_id'});
  };
  return Number;
};