'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pronouns_other = sequelize.define('pronouns_others', {
    word: DataTypes.STRING,
    type: DataTypes.STRING,
    number_id: DataTypes.INTEGER
  });
  Pronouns_other.associate = function(models) {
    Pronouns_other.belongsTo(models.numbers, {foreignKey: 'number_id'});
  };
  return Pronouns_other;
};