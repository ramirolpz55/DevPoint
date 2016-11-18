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
        router.get('/users', function(req, res) {
            user.findAll().then(function(data) {
                res.json(data);
            });
        });




        //=======================****************==============================================================
        router.get('/users?id', function(req, res) {
            user.findById(req.params.id).then(function(data) {
                res.json(data);
            })
        });

        //=======================****************==============================================================
        router.post('/users', function(req, res) {
            var r = req.body;
            user.create({
                    firstName: r.firstName,
                    lastName: r.lastName,
                    email: r.email,
                    password: r.password,
                    description: r.description,
                    linkGitHub: r.linkGitHub
                })
                .then(function(data) {
                    res.json(data);
                })
        });

        //=======================****************==============================================================
        router.post('/users/byusername', function(req, res) {
            user.findOne({
                where: {
                    username: req.body.username
                }
            }).then(function(user) {
                res.json(user);
            });
        });
        router.post('/users/uploadimage', function(req, res) {
            console.log(req.files);

            var sampleFile;

            if (!req.files) {
                res.send('No files were uploaded.');
                return;
            }

            sampleFile = req.files.pic;
            sampleFile.mv('./public/user_images/' +res.locals.user.username+sampleFile.mimetype.replace("image/", "."), function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    // res.send('File uploaded!');
                    res.redirect("/mydashboard/aboutme");
                }
            });
        })

        //=======================****************==============================================================
        router.put('/users/:id', function(req, res) {
            var r = req.body;
            console.log(req);
            user.update({
                    firstName: r.firstName,
                    lastName: r.lastName,
                    email: r.email,
                    password: r.password,
                    description: r.description,
                    linkGitHub: r.linkGitHub,
                    linkFacebook: r.linkFacebook,
                    linkStack: r.linkStack,
                    linkTwitter: r.linkTwitter,
                    linkLinkedIn: r.linkLinkedIn,
                    headline: r.headline
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
