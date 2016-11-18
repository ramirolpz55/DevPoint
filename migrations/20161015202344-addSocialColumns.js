'use strict';

module.exports = {
    up: function(queryInterface, DataTypes) {
        queryInterface.addColumn(
            'Users',
            'linkFacebook',
            DataTypes.STRING
        );
        queryInterface.addColumn(
            'Users',
            'linkStack',
            DataTypes.STRING
        );
        queryInterface.addColumn(
            'Users',
            'linkTwitter',
            DataTypes.STRING
        );
        queryInterface.addColumn(
            'Users',
            'linkLinkedIn',
            DataTypes.STRING
        );
        return;
    },

    down: function(queryInterface, Sequelize) {
       queryInterface.removeColumn('Users', 'linkFacebook');
       queryInterface.removeColumn('Users', 'linkStack');
       queryInterface.removeColumn('Users', 'linkTwitter');
       queryInterface.removeColumn('Users', 'linkLinkedIn');

       return;
    }
};
