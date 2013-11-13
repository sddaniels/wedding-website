
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var lessMiddleware = require('less-middleware');

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

// handlebars helpers
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
	var block = blocks[name];
	if (!block) {
		block = blocks[name] = [];
	}
	
	block.push(context.fn(this));
});

hbs.registerHelper('block', function(name) {
	var val = (blocks[name] || []).join('\n');
	
	// clear the block
	blocks[name] = [];
	return val;
});

hbs.registerHelper('year', function() {
	return new Date().getFullYear();
});

hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// routing
app.get('/', routes.index);
app.get('/florida', routes.florida);
app.get('/iowa', routes.iowa);
app.get('/registry', routes.registry);
app.get('/photos', routes.photos);
app.get('/rsvp', routes.rsvp);

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
