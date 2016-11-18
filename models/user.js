'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.TEXT,
    linkGitHub: DataTypes.STRING,
    linkFacebook: DataTypes.STRING,
    linkStack: DataTypes.STRING,
    linkTwitter: DataTypes.STRING,
    linkLinkedIn: DataTypes.STRING,
    username: DataTypes.STRING,
    headline: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Project);
        User.hasMany(models.Message);
        User.hasMany(models.Service);

      }
    }
  });
  return User;
};