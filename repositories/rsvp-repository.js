var db = require('../config/db-schema');

exports.getAll = function(next) {
	
	db.Rsvp.find({}, function(err, docs) {
		if (err) handleErrorFor(err, next);
		return next(null, docs);
	});
};

exports.getByEmailAddress = function(emailAddress, next) {

	db.Rsvp.findOne({ emailAddress: emailAddress }, function(err, doc) {
		if (err) handlErrorFor(err, next);
		return next(null, doc);
	});
};

function handleErrorFor(err, next) {

	console.log('ERROR getting rsvp data.');
	console.log(err);
	next(err);
}