var db = require('../config/db-schema');

exports.getTotalCount = function(next) {

	db.Poll.count({}, function(err, count) {
		if (err) handleErrorFor(err, next);
		return next(null, count);
	});
};

exports.getFloridaCount = function(next) {

	db.Poll.count({ florida: true }, function(err, count) {
		if (err) handleErrorFor(err, next);
		return next(null, count);
	});
};

exports.getIowaCount = function(next) {

	db.Poll.count({ iowa: true }, function(err, count) {
		if (err) handleErrorFor(err, next);
		return next(null, count);
	});
};

exports.getNotGoingCount = function(next) {

	db.Poll.count({ notGoing: true }, function(err, count) {
		if (err) handleErrorFor(err, next);
		return next(null, count);
	});
};

function handleErrorFor(err, next) {

	console.log('ERROR getting poll data.');
	console.log(err);
	next(err);
}