var sendgrid = require('sendgrid')(
	process.env.SENDGRID_USERNAME,
	process.env.SENDGRID_PASSWORD
);

exports.sendTestEmailTo = function(emailAddress, next) {

	sendgrid.send({
		to: emailAddress,
		from: process.env.EMAIL_FROM_ADDRESS,
		subject: 'Hello world!',
		text: 'Sending email with NodeJS through SendGrid.'
	}, function(err, json) {
	
		if (err) {
			console.error(err);
			return next(err);
		};
		
		console.log(json);
		next();
	});
};