/*
 Here is where you create all the functions that will do the routing for your app, and the logic of each route.
 */
var express = require('express');
var router = express.Router();

var models = require('../../models');
var Service = models.Service;
var User = models.User;

var sequelizeConnection = models.sequelize;

var currentUser;

module.exports = function(app) {

    //=======================****************==============================================================
    router.get('/services/:userId', function(req, res) {
        Service.findAll({
            where: {
                UserId: res.locals.user.id
            }
        }).then(function(data) {
            res.json(data);
        })

    }); // use this on the front end and will give projects for specific user.

    router.get('/services', function(req, res) {
        Service.findAll().then(function(data) {
            res.json(data);
        })

    });
    router.get('/serviceById/:id', function(req, res) {
        Service.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        })

    });
    //=======================****************==============================================================
    router.post('/service', function(req, res) {
        var r = req.body;


        User.findById(res.locals.user.id).then(function(curUser) {
            currentUser = curUser;

            Service.create({
                title: r.title,
                description: r.description,
                //UserId: res.locals.user.id
            })
                .then(function(service) {
                    currentUser.addService(service);

                    return res.json({currentUser, service});
                });
        })
    });

    //=======================****************==============================================================
    router.put('/services/:id', function(req, res) {
        var r = req.body;
        Service.update({
            name: r.name,
            linkLiveDemo: r.linkLiveDemo,
            description: r.description,
            linkGitHub: r.linkGitHub
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(function(data) {
                res.json(data);
            })
    });

    app.use('/api', router);
}

//module.exports = router;
