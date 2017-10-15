'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('adjectives', {
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
        references: { model: 'adjective_types', key: 'id'}
      },
      comptype_id: {
        type: Sequelize.INTEGER,
        references: { model: 'adj_comparison_types', key: 'id'}
      },
      altcomp: {
        type: Sequelize.STRING
      },
      altsup: {
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
    return queryInterface.dropTable('adjectives');
  }
};