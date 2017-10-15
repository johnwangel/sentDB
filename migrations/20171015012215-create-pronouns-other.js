'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pronouns_others', {
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
      type1_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pronoun_types', key: 'id'}
      },
      type2_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pronoun_types', key: 'id'}
      },
      number_id: {
        type: Sequelize.INTEGER,
        references: { model: 'number', key: 'id'}
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
    return queryInterface.dropTable('pronouns_others');
  }
};