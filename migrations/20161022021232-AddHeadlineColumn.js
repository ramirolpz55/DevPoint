'use strict';

module.exports = {
  up: function(queryInterface, DataTypes) {
    queryInterface.addColumn(
        'Users',
        'headline',
        DataTypes.STRING
    );
    return;
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'headline');

    return;
  }
};

