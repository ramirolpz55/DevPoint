var express = require('express');
var router = express.Router();

var models = require('../../models');
var User = models.User;
var Message = models.Message;

var sequelizeConnection = models.sequelize;

var currentUser;

module.exports = function(app) {


    //=======================****************==============================================================
    router.get('/messages/:userId', function(req, res) {
        Message.findAll({
            where: {
                UserId: req.params.userId
            }
        }).then(function(data) {
            res.json(data);
        })

    }); // use this on the front end and will give projects for specific user.

    //=======================****************==============================================================
    router.post('/messages/:userId', function(req, res) {
        var r = req.body;

        User.findById(req.params.userId).then(function(curUser) {
            currentUser = curUser;
            //console.log(currentUser);

            Message.create({
                    email: r.email,
                    message: r.message,
                    phone: r.phone
                })
                .then(function(message) {
                    currentUser.addMessage(message);
                    return res.redirect('/api/messages/' +req.params.userId);
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
