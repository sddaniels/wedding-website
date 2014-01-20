
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var adminRoutes = require('./routes/admin');
var http = require('http');
var path = require('path');
var lessMiddleware = require('less-middleware');
var mongoose = require('mongoose');
var hbs = require('hbs');

require('./helpers/hbs-helpers')(hbs);
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(lessMiddleware({ src: path.join(__dirname, 'public'), yuicompress: true }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routing
app.get('/', routes.index);
app.get('/florida', routes.florida);
app.get('/iowa', routes.iowa);
app.get('/registry', routes.registry);
app.get('/photos', routes.photos);
app.get('/rsvp', routes.rsvp);

app.get('/admin', adminRoutes.index);
app.get('/admin/dashboard', adminRoutes.dashboard);
app.get('/admin/rsvp', adminRoutes.rsvp);
app.get('/admin/poll', adminRoutes.poll);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
