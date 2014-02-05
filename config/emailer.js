var sendgrid = require('sendgrid')(
	process.env.SENDGRID_USERNAME,
	process.env.SENDGRID_PASSWORD
);
var Email = sendgrid.Email;

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
		
		next();
	});
};

exports.sendRsvpLinkTo = function(emailAddress, rsvpId, next) {

	var email = new Email({
		to:       emailAddress,
		from:     process.env.EMAIL_FROM_ADDRESS,
		fromname: 'Lindsey & Shea',
		bcc:      process.env.EMAIL_FROM_ADDRESS,
		subject:  "RSVP Link for Shea & Lindsey's Wedding"
	});
	
	email.setHtml([
		'<p>Hey there,</p>',
		'',
		'<p>',
		'To get back into your RSVP, please use the following link:<br/>',
		'<a href="http://www.sheaslounge.com/rsvp/detail/' + rsvpId + '">Update Your RSVP</a>',
		'</p>',
		'',
		'<p>Please let Shea know if you have any trouble.</p>',
		'',
		'<p>Thanks,<br/>',
		'Shea & Lindsey</p>'
	].join("\r\n"));

	sendgrid.send(email, function(err, json) {
	
		if (err) {
			console.error(err);
			return next(err);
		};
		
		next();
	});
};