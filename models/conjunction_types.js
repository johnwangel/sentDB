'use strict';
module.exports = (sequelize, DataTypes) => {
  var Conjunction_types = sequelize.define('conjunction_types', {
    type: DataTypes.STRING
  });
  Conjunction_types.associate = function(models) {
      Conjunction_types.hasMany(models.conjunctions, {foreignKey: 'type_id'});
  };
  return Conjunction_types;
};