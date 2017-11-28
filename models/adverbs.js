'use strict';
module.exports = (sequelize, DataTypes) => {
  var Adverbs = sequelize.define('adverbs', {
    word: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    category: DataTypes.STRING,
  });
  Adverbs.associate = function(models) {
    Adverbs.belongsTo(models.adverb_types, {foreignKey: 'type_id'});
  };
  return Adverbs;
};