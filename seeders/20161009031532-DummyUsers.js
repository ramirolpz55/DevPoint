'use strict';

var User = require('../models')["User"];

module.exports = {
    up: function(queryInterface, Sequelize) {
        return User.bulkCreate([{
                firstName: "Jonathan",
                lastName: "Arellano",
                email: "jarellano@gmail.com",
                password: "$2a$10$kUBvM0Czt0SSP9H1glH9lu49wwtvtfxLDeH0q93Z66Tbiirvxcnsq",
                description: "this is my profile",
                linkGitHub: "github.com",
                username: "jarellano"
            }, {
                firstName: "Jemma",
                lastName: "Tiongson",
                email: "jtiongson@gmail.com",
                password: "$2a$10$kUBvM0Czt0SSP9H1glH9lu49wwtvtfxLDeH0q93Z66Tbiirvxcnsq",
                description: "this is my profile",
                linkGitHub: "github.com",
                username: "jtiongson"
            }, {
                firstName: "Ramiro",
                lastName: "Lopez",
                email: "rlopez@gmail.com",
                password: "$2a$10$kUBvM0Czt0SSP9H1glH9lu49wwtvtfxLDeH0q93Z66Tbiirvxcnsq",
                description: "this is my profile",
                linkGitHub: "github.com",
                username: "rlopez"
            }, {
                firstName: "Tim",
                lastName: "Hwang",
                email: "thwang@gmail.com",
                password: "$2a$10$kUBvM0Czt0SSP9H1glH9lu49wwtvtfxLDeH0q93Z66Tbiirvxcnsq",
                description: "this is my profile",
                linkGitHub: "github.com",
                username: "somethingbig"
            }

        ])
    },

    down: function(queryInterface, Sequelize) {
        return User.destroy({
            where: {
                username: [
                    "jarellano",
                    "jtiongson",
                    "rlopez",
                    "somethingbig"
                ]
            }
        })
    }
};
