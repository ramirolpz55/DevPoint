'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.sequelize.query('ALTER TABLE `Messages` ADD `UserId` INTEGER, ADD CONSTRAINT `UserId_foreign_message` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;');
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.sequelize.query('ALTER TABLE Messages DROP FOREIGN KEY UserId_foreign_message');
        queryInterface.sequelize.query('ALTER TABLE Projects DROP COLUMN UserId');
        return;
  }
};
