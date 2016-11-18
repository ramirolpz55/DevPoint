var express = require('express');
var router = express.Router();
//var user = require('../models/user.js');
var models = require('../models');
var user = models.User;
var project = models.Project;
var service = models.Service;
var sequelizeConnection = models.sequelize;
var session = require('client-sessions');

//Manually adding one user into the database and then adding a project to that user

module.exports = function(app) {
    router.get('/samplePortfolio', function(req, res) {
        res.render("portfolio/sample", { layout: "sampleportfolio" });
    });

    function renderPage(res, username, page) {
        user.findOne({
            where: {
                "username": username
            }
        }).then(function(data) {
            res.locals.user = data;


            project.findAll({
                where: {
                    UserId: data.id
                }
            }).then(function(projectData) {
                res.locals.projects = projectData;

                service.findAll({
                    where:{
                        UserId: data.id
                    }
                }).then(function (serviceData) {
                    res.locals.services = serviceData;
                    res.render(page, { layout: "sampleportfolio" });
                })
            })
        });
    }

    router.get('/:portfolio/', function(req, res) {

            renderPage(res, req.params.portfolio, "portfolio/about");


    });

    router.get('/:portfolio/portfolio', function(req, res) {
        renderPage(res, req.params.portfolio, "portfolio/portfolio");

    });

    router.get('/:portfolio/about', function(req, res) {
        renderPage(res, req.params.portfolio, "portfolio/about");
    });

    router.get('/:portfolio/contact', function(req, res) {
        renderPage(res, req.params.portfolio, "portfolio/contact");
    });



    app.use('/', router);


};
