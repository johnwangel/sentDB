'use strict';
module.exports = (sequelize, DataTypes) => {
  var Adj_comparison_types = sequelize.define('adj_comparison_types', {
    type: DataTypes.STRING
  };
  Adj_comparison_types.associate = function(models) {
      Status.hasMany(models.adjectives, {foreignKey: 'comptype_id'});
  });
  return Adj_comparison_types;
};