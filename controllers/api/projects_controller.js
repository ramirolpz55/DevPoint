/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();

var models = require('../../models');
var project = models.Project;
var User = models.User;

var sequelizeConnection = models.sequelize;

var currentUser;

module.exports = function(app) {


    // router.get('/projects', function(req, res) {
    //     project.findAll().then(function(data) {
    //         res.json(data);
    //     });
    // });

    // router.get('/projects?id', function(req, res) {
    //     project.findById(req.params.id).then(function(data) {
    //         res.json(data);
    //     })
    // });

    //=======================****************==============================================================
    router.get('/projects/:userId', function(req, res) {
        project.findAll({
            where: {
                UserId: res.locals.user.id
            }
        }).then(function(data) {
            res.json(data);
        })

    }); // use this on the front end and will give projects for specific user.

    router.get('/projects', function(req, res) {
        project.findAll().then(function(data) {
            res.json(data);
        })

    });
    router.get('/projectById/:id', function(req, res) {
        project.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        })

    });
    //=======================****************==============================================================
    router.post('/projects', function(req, res) {
        var r = req.body;

        User.findById(res.locals.user.id).then(function(curUser) {
            currentUser = curUser;

            project.create({
                    name: r.name,
                    linkLiveDemo: r.linkLiveDemo,
                    description: r.description,
                    linkGitHub: r.linkGitHub,
                    //UserId: res.locals.user.id
                })
                .then(function(project) {
                    currentUser.addProject(project);
                    return res.json({currentUser, project});
                });
        })
    });

    //=======================****************==============================================================
    router.put('/projects/:id', function(req, res) {
        var r = req.body;
        project.update({
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
