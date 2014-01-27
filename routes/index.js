exports.index = function(req, res) {

	res.render('index', { 
		title: 'Shea & Lindsey\'s Wedding',
		pollError: req.query.error,
		pollDone: req.query.poll
	});
};

exports.pollPost = function(req, res) {

	var db = require('../config/db-schema');
	
	var pollResponse = new db.Poll({
		florida:  userIsGoingTo('florida', req),
		iowa:     userIsGoingTo('iowa', req),
		notGoing: userIsGoingTo('notgoing', req),	
		date:     new Date()
	});
	
	pollResponse.save(function (err) { 
		if (err) {
			console.log('ERROR saving poll.');
			console.log(err);
			res.redirect('/?error=verymuchyes');
		} else {
			res.redirect('/?poll=done');
		}
	});
};

exports.florida = function(req, res) {

	res.render('florida', { 
		title: 'Florida - Shea & Lindsey\'s Wedding',
        currentPage: 'florida'
    });
};

exports.iowa = function(req, res) {

	res.render('iowa', { 
		title: 'Iowa - Shea & Lindsey\'s Wedding',
        currentPage: 'iowa'
    });
};

exports.registry = function(req, res) {

	res.render('registry', { 
		title: 'Registry - Shea & Lindsey\'s Wedding',
        currentPage: 'registry'
    });
};

exports.photos = function(req, res) {

	res.render('photos', { 
		title: 'Photos - Shea & Lindsey\'s Wedding',
        currentPage: 'photos'
    });
};

exports.rsvp = function(req, res) {

	res.render('rsvp', { 
		title: 'RSVP - Shea & Lindsey\'s Wedding',
        currentPage: 'rsvp'
    });
};

function userIsGoingTo(destination, req) {

	return req.body.poll === destination;
}