var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
exports.mongoose = mongoose;

var SALT_WORK_FACTOR = 10;

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

// users

var userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name:     { type: String, required: true }
});

userSchema.methods.comparePassword = function(candidatePassword, done) {

	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return done(err);
		done(null, isMatch);
	});
};

userSchema.methods.hashPassword = function(password, done) {

	bcrypt.hash(password, SALT_WORK_FACTOR, function(err, hash) {
		if (err) return done(err);
		done(null, hash);
	});
};

var UserModel = mongoose.model('User', userSchema);
exports.User = UserModel;

// poll results

var pollSchema = new Schema({
	florida:  Boolean,
	iowa:     Boolean,
	notGoing: Boolean,
	date:     { type: Date, required: true }
});

var PollModel = mongoose.model('Poll', pollSchema);
exports.Poll = PollModel;