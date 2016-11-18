var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var exphbs = require('express-handlebars');
var helpers = require('./config/helpers');
var morgan = require('morgan');
var session = require('client-sessions');
var models = require('./models');
var fileUpload = require('express-fileupload');
var favicon = require('serve-favicon');

var app = express();

//PORT ENVIORNMENTS 
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(methodOverride('_method'));
//app.use(morgan('dev'));
app.use(fileUpload());

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: helpers,
    partialsDir: [
        'views/partials/'
    ]
});

app.engine('handlebars', hbs.engine);
app.use(express.static(process.cwd() + '/public'));
app.set('view engine', 'handlebars');
app.use(favicon(process.cwd() + '/public/favicon.ico'));

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 60 * 60 * 1000,
    activeDuration: 60 * 60 * 1000
}))

app.use(function(req, res, next) {
    var user = models.User;
    if (req.session && req.session.user) {
        console.log("it works");
        user.findById(req.session.user.id).then(function(userData){
            if(userData){
                req.user = userData;
                delete req.user.password;
                req.session.user = userData;
                res.locals.user = userData;
            }
            next();
        });
    } else{
        next();
    }
})


//require all controllers. Pass 'app' to all controllers and return app.use("/", router)
require('./controllers/dashboard_controller.js')(app);
require('./controllers/api/users_controller.js')(app);
require('./controllers/api/projects_controller.js')(app);
require('./controllers/api/services_controller.js')(app);
require('./controllers/api/messages_controller.js')(app);
require('./controllers/api/demodata_controller.js')(app);
require('./controllers/auth_controller.js')(app);
require('./controllers/landing_controller.js')(app);  
require('./controllers/portfolio_controller.js')(app);


// app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.redirect('/mydashboard');
// });


//APP LISTEN PORT
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


