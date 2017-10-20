'use strict';
module.exports = (sequelize, DataTypes) => {
  var Adverb_type = sequelize.define('adverb_types', {
    type: DataTypes.STRING
  });
  Adverb_type.associate = function(models) {
      Adverb_type.hasMany(models.adverbs, {foreignKey: 'type_id'});
  };
  return Adverb_type;
};