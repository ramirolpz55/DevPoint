/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();

var models = require('../../models');
var user = models.User;
var project = models.Project;
var service = models.Service;
var message = models.Message;
var sequelizeConnection = models.sequelize;



module.exports = function(app) {

        router.get('/clearAll', function (req, res) {
            project.destroy({
                truncate: true /* this will ignore where and truncate the table instead */
            });
            service.destroy({
                truncate: true /* this will ignore where and truncate the table instead */
            });
            message.destroy({
                truncate: true /* this will ignore where and truncate the table instead */
            });
            user.destroy({
                where: {
                    id: {
                        $ne: 0
                    }
                }
            });

            res.json('Everything has been deleted');
        } );

        var userId;
        router.get('/create', function(req, res){
            user.create({
                username: "tdhwang",
                firstName: "Tim",
                lastName: "Hwang",
                email: "tdhwang@uci.edu",
                password: "$2a$10$0.W5NGZ2pfVRXiKbI/9.GeoEYbe5L3bLSx0/A6AYcong2omOwghH.",
                description: "My name is Tim and I love to snowboard and play videogames. " +
                "I specialize in automation functions and QA testing for different areas of a platform.  " +
                "Passion is in the eye of the beholder and one will always have room for improvement. " +
                "Team Mystic all day every day.",
                linkGitHub: "https://github.com/tdhwang",
                linkFacebook: "https://www.facebook.com/tim.hwang.31",
                linkStack: "",
                linkTwitter: "",
                linkLinkedIn: "https://www.linkedin.com/in/timothy-hwang-944239105",
                headline: "Hello my name is Tim " +
                "A pleasure to meet you!"
            })
                .then(function (userData) {
                    userId = userData.dataValues.id;
                })
                .then(function(userData) {
                    console.log(userId);
                    project.bulkCreate([
                        {
                            UserId: userId,
                            name: "Music Playlist",
                            linkLiveDemo: "",
                            description: "An application where one can create a music playlist",
                            linkGitHub: "https://github.com/tdhwang/MUSIC-PLAYER-PLAYLIST"
                        },
                        {
                            UserId: userId,
                            name: "Pokemon Guessing Game",
                            linkLiveDemo: "",
                            description: "Choose a pokemon and add to the correct number",
                            linkGitHub: "https://github.com/tdhwang/week-4-game"
                        }
                    ]).then(function (projectData) {
                        console.log("Projects added for " + userData.name)
                    });
                })
                .then(function (userData) {
                    service.bulkCreate([
                        {
                            UserId: userId,
                            title: "HTML/Bootstrap",
                            description: "I will create an html website to your specification " +
                            "using bootstrap."
                        },
                        {
                            UserId: userId,
                            title: "Javascript",
                            description: "I can do front end and back end developement in JavaScript " +
                            "for your website."
                        },
                        {
                            UserId: userId,
                            title: "Full Stack Development",
                            description: "Give me your idea and I will take you from start to finish " +
                            "to develop your app. This means front end design to backend logic."
                        }
                    ])
                })
                .then(function (userData) {

                    res.json("It worked");
                })
            user.create({
                username: "jTiongson",
                firstName: "Jemma",
                lastName: "Tiongson",
                email: "jtiongson@gmail.com",
                password: "$2a$10$kUBvM0Czt0SSP9H1glH9lu49wwtvtfxLDeH0q93Z66Tbiirvxcnsq",
                description: "I am currently a student at UCLA Coding Bootcamp training to become a Jr. Web Developer. I aim to intern at a small web-dev company to enrich my coding skills as I pursue my Computer Science B.S at Cal State University Northridge.",
                linkGitHub: "https://github.com/jemmamariex3",
                linkFacebook: "",
                linkStack: "https://stackoverflow.com/users/7017647/jemmamariex3",
                linkTwitter: "",
                linkLinkedIn: "https://www.linkedin.com/in/jemma-tiongson-a6b027b0",
                headline: "Jr. Web Developer"
            })
                .then(function (userData) {
                    userId = userData.dataValues.id;
                })
                .then(function(userData) {
                    console.log(userId);
                    project.bulkCreate([
                        {
                            UserId: userId,
                            name: "Burger App",
                            linkLiveDemo: "",
                            description: "The Burger app incorporates handlebars, MySQL and the MVC model skills that allows user to devour choices of burgers.",
                            linkGitHub: "https://github.com/jemmamariex3/Week-15---Burger-2"
                        },
                        {
                            UserId: userId,
                            name: "MyPolity",
                            linkLiveDemo: "",
                            description: "MyPolity is a web app that gives users information about their federal, state and local government representatives.",
                            linkGitHub: "https://github.com/jackemuk/MyPolity"
                        }
                    ]).then(function (projectData) {
                        console.log("Projects added for " + userData.name)
                    });
                })
                .then(function (userData) {
                    service.bulkCreate([
                        {
                            UserId: userId,
                            title: "HTML/Bootstrap",
                            description: "I will create an html website to your specification " +
                            "using bootstrap."
                        },
                        {
                            UserId: userId,
                            title: "Javascript",
                            description: "I can do front end and back end developement in JavaScript " +
                            "for your website."
                        },
                        {
                            UserId: userId,
                            title: "Full Stack Development",
                            description: "Give me your idea and I will take you from start to finish " +
                            "to develop your app. This means front end design to backend logic."
                        }
                    ])
                })
                .then(function (userData) {

                    res.json("It worked");
                })

        });



        app.use('/demo', router);
    }
    //module.exports = router;
