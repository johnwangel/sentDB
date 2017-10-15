'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('verbs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      word: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      is_aux: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_passive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      tense_pres3ps: {
        type: Sequelize.STRING
      },
      tense_past1ps: {
        type: Sequelize.STRING
      },
      tense_past2ps: {
        type: Sequelize.STRING
      },
      tense_past3ps: {
        type: Sequelize.STRING
      },
      tense_past1pp: {
        type: Sequelize.STRING
      },
      tense_past2pp: {
        type: Sequelize.STRING
      },
      tense_past3pp: {
        type: Sequelize.STRING
      },
      past_part: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('verbs');
  }
};