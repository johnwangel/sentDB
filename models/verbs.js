'use strict';
module.exports = (sequelize, DataTypes) => {
  var verbs = sequelize.define('verbs', {
    word: DataTypes.STRING,
    is_aux: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    is_passive: DataTypes.BOOLEAN,
    tense_pres3ps: DataTypes.STRING,
    tense_past1ps: DataTypes.STRING,
    tense_past2ps: DataTypes.STRING,
    tense_past3ps: DataTypes.STRING,
    tense_past1pp: DataTypes.STRING,
    tense_past2pp: DataTypes.STRING,
    tense_past3pp: DataTypes.STRING,
    past_part: DataTypes.STRING,
    category: DataTypes.STRING,
  });
  return verbs;
};