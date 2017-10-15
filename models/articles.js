'use strict';
module.exports = (sequelize, DataTypes) => {
  var articles = sequelize.define('articles', {
    word: DataTypes.STRING
  });
  return articles;
};