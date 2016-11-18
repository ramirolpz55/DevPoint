var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var models = require('../models');
var sequelizeConnection = models.sequelize;
var session = require('client-sessions');

//Manually adding one user into the database and then adding a project to that user

module.exports = function(app) {
	router.get('/', function(req, res) {
        res.render('landing_page/landing.handlebars', {layout:"landing"});
    });

    router.get('/searchresults', function(req, res) {
        res.render('landing/searchresults.handlebars', {layout:false});
    });

    //The router that takes you to the product details page. 
     router.get('/details', function(req, res) {

        res.render('details/details.handlebars', {layout:false});
    });


    app.use('/', router);
}
