
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var adminRoutes = require('./routes/admin');
var http = require('http');
var path = require('path');
var lessMiddleware = require('less-middleware');
var passport = require('passport');
var db = require('./config/db-schema');
var auth = require('./config/passport-config');
var hbs = require('hbs');

require('./config/hbs-helpers')(hbs);
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('the most secrety of secrets'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(lessMiddleware({ src: path.join(__dirname, 'public'), yuicompress: true }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routing
app.get('/', routes.index);
app.post('/poll', routes.pollPost);
app.get('/florida', routes.florida);
app.get('/iowa', routes.iowa);
app.get('/registry', routes.registry);
app.get('/photos', routes.photos);
app.get('/rsvp', routes.rsvp);

app.get('/admin', adminRoutes.index);
app.post('/admin', adminRoutes.indexPost);
app.get('/admin/dashboard', auth.ensureAuthenticated, adminRoutes.dashboard);
app.get('/admin/rsvp', auth.ensureAuthenticated, adminRoutes.rsvp);
app.get('/admin/poll', auth.ensureAuthenticated, adminRoutes.poll);
app.get('/admin/logout', adminRoutes.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
