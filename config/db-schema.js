var mongoose = require('mongoose');
exports.mongoose = mongoose;

// connectify up in here!
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

// schema
/////////////////////////////////////

var Schema = mongoose.Schema;

// poll results

var pollSchema = new Schema({
	florida:  Boolean,
	iowa:     Boolean,
	notGoing: Boolean,
	date:     Date
});

var pollModel = mongoose.model('Poll', pollSchema);
exports.pollModel = pollModel;