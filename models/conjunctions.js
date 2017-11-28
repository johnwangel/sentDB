'use strict';
module.exports = (sequelize, DataTypes) => {
  var Conjunctions = sequelize.define('conjunctions', {
    word: DataTypes.STRING,
    type_id: DataTypes.STRING,
  });
  Conjunctions.associate = function(models) {
    Conjunctions.belongsTo(models.conjunction_types, {foreignKey: 'type_id'});
  };
  return Conjunctions;
};