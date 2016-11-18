'use strict';
module.exports = function(sequelize, DataTypes) {
  var SocialProfile = sequelize.define('SocialProfile', {
    name: DataTypes.STRING,
    link: DataTypes.TEXT,
    phone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SocialProfile;
};