var async = require('async');
var pollRepo = require('../repositories/poll-repository');


exports.index = function(req, res) {

	var message = req.session.message;
	req.session.message = null;

	res.render('admin', { 
		title: 'Admin Login - Shea & Lindsey\'s Wedding',
		layout: '',
		message: message,
		username: req.body.username
	});
};

exports.indexPost = function(req, res, next) {

	var passport = require('passport');
	passport.authenticate('local', function(err, user, info) {
	
		if (err) { return next(err); }
		
		if (!user) {
			req.session.message = [info.message];
			return exports.index(req, res);
		}
	
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			return res.redirect('/admin/dashboard');
		});
		
	})(req, res, next);
};

exports.dashboard = function(req, res) {

	async.parallel(
		{
			totalCount: pollRepo.getTotalCount,
			floridaCount: pollRepo.getFloridaCount,
			iowaCount: pollRepo.getIowaCount,
			notGoingCount: pollRepo.getNotGoingCount
		},
		function(err, pollData) {
		
			if (err) renderErrorFor(err, res);
		
			res.render('admin-dashboard', { 
				title: 'Admin - Shea & Lindsey\'s Wedding',
				layout: 'admin-layout',
				user: req.user,
				poll: pollData
			});
		}
	);
};

exports.rsvp = function(req, res) {

	res.render('admin-rsvp', { 
		title: 'RSVP - Admin - Shea & Lindsey\'s Wedding',
		layout: 'admin-layout',
		currentPage: 'rsvp'
	});
};

exports.poll = function(req, res) {

	pollRepo.getAll(function(err, responses) {
		
		if (err) renderErrorFor(err, res);
		
		res.render('admin-poll', { 
			title: 'Poll - Admin - Shea & Lindsey\'s Wedding',
			layout: 'admin-layout',
			currentPage: 'poll',
			pollResponses: responses
		});		
	});
};

exports.logout = function(req, res) {

	req.logout();
	res.redirect('/admin');
};

function renderErrorFor(err, res) {

	res.render('error', {
		title: 'Error - Admin - Shea & Lindsey\'s Wedding',
		layout: 'admin-layout',
		error: err
	});
}