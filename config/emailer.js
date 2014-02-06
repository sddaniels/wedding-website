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

exports.sendConfirmationFor = function(rsvp, next) {

	var email = new Email({
		to:       rsvp.emailAddress,
		from:     process.env.EMAIL_FROM_ADDRESS,
		fromname: 'Lindsey & Shea',
		bcc:      process.env.EMAIL_FROM_ADDRESS,
		subject:  "RSVP Confirmation for Shea & Lindsey's Wedding"
	});
	
	email.setHtml([
		'<p>Thanks for the RSVP!</p>',
		'',
		buildConfirmationContent(rsvp),
		'',
		'<p>',
		'<em>Guests in Your Party</em>',
		'<ul>',
		'<li>' + rsvp.name + '</li>',
		buildGuestList(rsvp),
		'</ul>',
		'</p>',
		'',
		'<p>',
		'To get back into your RSVP, please use the following link:<br/>',
		'<a href="http://www.sheaslounge.com/rsvp/detail/' + rsvp.rsvpId + '">Update Your RSVP</a>',
		'</p>',
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


function buildConfirmationContent(rsvp) {

	if (rsvp.accept) {
		return '<p>You said you were coming to Florida with a party of ' + rsvp.guestCount +
		       '. See you on the beach!</p>';
	} else if (rsvp.iowa) {
		return '<p>You said you couldn\'t make it to Florida, but you\'d try to make it to Iowa for our casual reception in June.</p>';
	} else if (rsvp.decline) {
		return '<p>You said you couldn\'t make it. We\'ll miss you! Hopefully we will get a chance to catch up sometime.</p>';
	} else {
		return '<p>It looks like we may have had a problem saving whether you\'d be able to come or not. Please try again using the link below or contact Shea.</p>';
	}

}

function buildGuestList(rsvp) {

	if (rsvp.guests.length == 0) {
		return '';
	}

	return '<li>' + rsvp.guests.join("</li>\r\n<li>") + '</li>';
}