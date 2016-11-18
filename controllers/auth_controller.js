var express = require('express');
var router = express.Router();

var models = require('../models');
var project = models.Project;
var user = models.User;

var session = require('client-sessions');

var sequelizeConnection = models.sequelize;

var bcrypt = require('bcrypt');


//=======================****************==============================================================
//function to find user by username. cb(exists, data)  is returned. Exists will be true or false
module.exports = function(app) {
        function findByUsername(username, cb) {
            user.findOne({
                where: {
                    'username': username
                }
            }).then(function(data) {
                if (data == null) {
                    cb(false, data);
                } else {
                    cb(true, data);
                }

            })
        };

    //=======================****************==============================================================
    //Router function for the initial user registration
    router.post('/register', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        //New Pass word Variable 
        var newPasswordConfirm = req.body.newPasswordConfirm;

        if (password != newPasswordConfirm) {
            return res.json({ "response": false, message: "Password does not match, Please try again!" });
        }

        findByUsername(username, function(exists, userData) {
            if (exists) {
                // console.log("We got here");
                // render :json =>  ["username", false , "This name is already taken"]
                return res.json({ "response": false, message: "Username is already taken." });
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    // once the salt is made, hash the password with that salt
                    bcrypt.hash(password, salt, function(err, hash) {
                        var r = req.body;
                        user.create({
                                firstName: r.firstName,
                                lastName: r.lastName,
                                email: r.email,
                                password: hash,
                                description: r.description,
                                linkGitHub: r.linkGitHub,
                                username: r.username
                            })
                            .then(function(data) {
                                // res.redirect('/api/users');
                                //If user passes it will take them to login page. 
                                return res.json({ "response": true, message: "Thank you for Registering" });
                            });
                    });
                });
            };
        });
    });


    //=======================****************==============================================================
    //Router function for the login logic
    router.post('/login', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        findByUsername(username, function(exists, userData) {
            if (exists) {
                bcrypt.compare(password, userData.password, function(err, matched) {
                    // if the password is true
                    if (matched === true) {
                        // you can make the site operate as intended for logged in users
                        req.session.user = userData;
                        //res.json({ "Response": "Success. You have logged in." })
                        return res.json({ "response": true, message: "Welcome!" });
                        res.redirect('/mydashboard');
                    } else {
                        // otherwise, you can black access to parts of your site
                        return res.json({ "response": false, message: "Incorrect Username or Password" });
                    }
                });
            } else {
                return res.json({ "response": false, message: "Username not found" });
            }
        })
    });

    //=======================****************==============================================================
    //Router function for the Reset password 
   router.post('/reset-password', function(req, res) {
       var username = req.body.username;
       var password = req.body.password;
       var userID = req.session.user.id
           //New Password Variables 
       var newPassword = req.body.newPassword;
       var newPasswordConfirm = req.body.newPasswordConfirm;

       if (newPassword != newPasswordConfirm) {
           return res.json({ "response": false, message: "Sorry! Your new Passwords do not match" });
       }

       //This gets the user id from the database
       user.findById(userID).then(function(data) {
           bcrypt.compare(password, data.password, function(err, matched) {
               // if the password is true
               if (matched === true) {

                   bcrypt.genSalt(10, function(err, salt) {
                       // once the salt is made, hash the password with that salt
                       bcrypt.hash(newPassword, salt, function(err, hash) {

                           data.update({
                                   password: hash
                               })
                               .then(function(data) {
                                   return res.json({ "response": true, message: "Your Password has been changed!" });
                               });
                       });
                   });
               } else {
                   // otherwise, you can black access to parts of your site
                   return res.json({ "response": false, message: "Your original Password does not match, Please try again!" });
               }
           });
       })
   });





    //=======================****************==============================================================
    //Router for the login 
    router.get('/login', function(req, res) {
        if (req.user) {
            return res.redirect('/mydashboard');
        }
        res.render("landing/login", { layout: false });
    });

    //=======================****************==============================================================
    //Router for the Logout 
    router.get('/logout', function(req, res) {
        req.session.reset();
        res.redirect('/login');
    })

    //=======================****************==============================================================
    //Router for the Reset Password 
    router.get('/reset-password', function(req, res) {
        res.render("reset-password", { layout: false });
    });

    //=======================****************==============================================================
    //Router for the Sign Up 
    router.get('/signup', function(req, res) {
        res.render('landing/signup', { layout: false });
    });



    app.use('/', router);
}




//module.exports = router;
