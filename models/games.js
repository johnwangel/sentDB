'use strict';
module.exports = (sequelize, DataTypes) => {
  var Games = sequelize.define('games', {
      user_id: DataTypes.INTEGER,
      game_state: DataTypes.JSON,
  });
  return Games;
};