var mongoose = require('mongoose');
exports.mongoose = mongoose;

var uriString =
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/wedding';
	
mongoose.connect(uriString, null, function(err, res) {

	if (err) {
		console.log('ERROR connecting to: ' + uriString + '. ' + err);
	} else {
		console.log('Successfully connected to: ' + uriString);
	}
});