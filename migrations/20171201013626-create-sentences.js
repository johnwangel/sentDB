'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sentences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      words: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      },
      coded: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      complexity_id: {
        type: Sequelize.INTEGER,
        references: { model: 'sentence_complexity', key: 'id'}
      },
      keywords: {
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
    return queryInterface.dropTable('sentences');
  }
};