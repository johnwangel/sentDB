'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('adverbs', {
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
      type_id: {
        type: Sequelize.INTEGER,
        references: { model: 'adverb_types', key: 'id'}
      },
      category: {
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
    return queryInterface.dropTable('adverbs');
  }
};