'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    linkLiveDemo: DataTypes.STRING,
    description: DataTypes.TEXT,
    linkGitHub: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return Project;
};