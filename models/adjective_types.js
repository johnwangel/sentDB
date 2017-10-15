'use strict';
module.exports = (sequelize, DataTypes) => {
  var Adjective_types = sequelize.define('adjective_types', {
    type: DataTypes.STRING
  });
  Adjective_types.associate = function(models) {
      Adjective_types.hasMany(models.adjectives, {foreignKey: 'type_id'});
  };
  return Adjective_types;
};