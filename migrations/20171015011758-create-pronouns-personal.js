'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pronouns_personals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      person_id: {
        type: Sequelize.INTEGER,
        references: { model: 'person', key: 'id'}
      },
      number_id: {
        type: Sequelize.INTEGER,
        references: { model: 'number', key: 'id'}
      },
      gender_id: {
        type: Sequelize.INTEGER,
        references: { model: 'gender', key: 'id'}
      },
      subjective: {
        type: Sequelize.STRING
      },
      objective: {
        type: Sequelize.STRING
      },
      possessiveAttributive: {
        type: Sequelize.STRING
      },
      possessivePredicate: {
        type: Sequelize.STRING
      },
      reflexive: {
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
    return queryInterface.dropTable('pronouns_personals');
  }
};