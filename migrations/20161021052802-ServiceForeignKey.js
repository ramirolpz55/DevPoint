'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.sequelize.query('ALTER TABLE `Services` ADD `UserId` INTEGER, ADD CONSTRAINT `UserId_foreign_services` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;');
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.sequelize.query('ALTER TABLE Services DROP FOREIGN KEY UserId_foreign_services');
    queryInterface.sequelize.query('ALTER TABLE Services DROP COLUMN UserId');
    return;
  }
};
