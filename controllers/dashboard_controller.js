var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var project = require('../models/project.js');
var models = require('../models');
var sequelizeConnection = models.sequelize;
var session = require('client-sessions');
//Manually adding one user into the database and then adding a project to that user

module.exports = function(app) {
    function requireLogin(req, res, next) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            next();
        }
    };

    router.get('/', requireLogin, function(req, res) {
        res.render("dashboard/dashboard", { test: "Jonathan" });
    });

    //This allows you to route to any named view dynamically assuming that it exists
    router.get('/:page', requireLogin, function(req, res) {
        res.locals.Title = req.params.page
        res.render('dashboard/' + req.params.page);
    });

    app.use('/mydashboard', router);
}
