'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  });

  Users.associate = function(models) {
    Users.hasMany(models.games, { foreignKey: 'user_id' });
  };

  return Users;
};