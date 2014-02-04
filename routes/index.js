var db = require('../config/db-schema');
var rsvpRepo = require('../repositories/rsvp-repository');

exports.index = function(req, res) {

	res.render('index', { 
		title: 'Shea & Lindsey\'s Wedding',
		pollError: req.query.error,
		pollDone: req.query.poll
	});
};

exports.pollPost = function(req, res) {
		
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

exports.rsvpPost = function(req, res) {

	if (!req.body.emailAddress || req.body.emailAddress.indexOf("@") == -1) {
	
		return res.render('rsvp', { 
			title: 'RSVP - Shea & Lindsey\'s Wedding',
			currentPage: 'rsvp',
			message: 'Please enter a valid email address!'
		});
	}

	rsvpRepo.getByEmailAddress(req.body.emailAddress, function(err, rsvp) {
	
		if (err) renderErrorFor(err, res);
	
		if (!rsvp) {
			var newRsvp = new db.Rsvp({
				emailAddress: req.body.emailAddress,
				guestCount: 0
			});
			
			newRsvp.save(function(err) {
				if (err) renderErrorFor(err, res);
				res.redirect('/rsvp/detail/' + newRsvp.rsvpId);
			});
			
		} else {
			res.redirect('/rsvp/code/');
		}
	});
};

exports.rsvpDetail = function(req, res) {
	
	rsvpRepo.getByRsvpId(req.params.id, function(err, rsvp) {
	
		if (err || !rsvp) renderErrorFor(err, res);
	
		res.render('rsvp-detail', {
			title: 'RSVP - Shea & Lindsey\'s Wedding',
			currentPage: 'rsvp',
			rsvp: rsvp
		});
	});
};

exports.rsvpDetailPost = function(req, res) {

	rsvpRepo.getByRsvpId(req.body.rsvpId, function(err, rsvp) {
	
		if (err || !rsvp) renderErrorFor(err, res);
	
		rsvp.name = req.body.rsvpName;
		rsvp.accept = userRSVPed('accept', req);
		rsvp.iowa = userRSVPed('iowa', req);
		rsvp.decline = userRSVPed('decline', req);
		rsvp.note = req.body.rsvpNote;
		
		//rsvp.guests = [];
		//for (var i in req.body.guests) {
		//	if (req.body.guests[i]) {
		//		rsvp.guests.push(req.body.guests[i]);
		//	}
		//}
		
		if (!rsvp.name) {
			return renderValidationErrorFor(rsvp, 'Please enter your name.', res);
		}
		if (!rsvp.accept && !rsvp.iowa && !rsvp.decline) {
			return renderValidationErrorFor(rsvp, "Please let us know if you're coming!", res);
		}
		
		rsvp.save(function(err) {
			console.log('save starting');
			if (err) renderErrorFor(err, res);
			console.log('save done');
			res.redirect('/rsvp/thanks');
		});
	});
};


function userIsGoingTo(destination, req) {

	return req.body.poll === destination;
}

function userRSVPed(rsvpAnswer, req) {

	return req.body.rsvpAnswer === rsvpAnswer;
}

function renderErrorFor(err, res) {

	res.render('error', {
		title: 'Error - Shea & Lindsey\'s Wedding',
		error: 'There was an unexpected problem with your request.'
	});
}

function renderValidationErrorFor(rsvp, message, res) {

	return res.render('rsvp-detail', { 
		title: 'RSVP - Shea & Lindsey\'s Wedding',
		currentPage: 'rsvp',
		message: message,
		rsvp: rsvp
	});
}