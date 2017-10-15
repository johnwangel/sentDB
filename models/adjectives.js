'use strict';
module.exports = (sequelize, DataTypes) => {
  var Adjectives = sequelize.define('adjectives', {
    word: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    comptype_id: DataTypes.INTEGER,
    altcomp: DataTypes.STRING,
    altsup: DataTypes.STRING
  });
  Adjectives.associate = function(models) {
    Adjectives.belongsTo(models.adj_comparison_types, {foreignKey: 'comptype_id'});
    Adjectives.belongsTo(models.adjective_types, {foreignKey: 'type_id'});
  };
  return Adjectives;
};