'use strict';
module.exports = (sequelize, DataTypes) => {
  var Games = sequelize.define('games', {
      user_id: DataTypes.INTEGER,
      game_state: DataTypes.JSON,
  });

  Games.associate = function(models) {
    Games.belongsTo(models.users, { foreignKey: 'user_id' } );
  };
  return Games;
};