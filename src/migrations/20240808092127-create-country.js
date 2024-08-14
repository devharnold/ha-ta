'use strict';

const { query } = require('express');
const { Sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      continent: {
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
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Countries', 'continent');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Countries');
  }
};
