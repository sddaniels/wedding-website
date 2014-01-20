exports.index = function(req, res){

	res.render('index', { 
		title: 'Shea & Lindsey\'s Wedding' 
	});
};

exports.florida = function(req, res){

	res.render('florida', { 
		title: 'Florida - Shea & Lindsey\'s Wedding',
        currentPage: 'florida'
    });
};

exports.iowa = function(req, res){

	res.render('iowa', { 
		title: 'Iowa - Shea & Lindsey\'s Wedding',
        currentPage: 'iowa'
    });
};

exports.registry = function(req, res){

	res.render('registry', { 
		title: 'Registry - Shea & Lindsey\'s Wedding',
        currentPage: 'registry'
    });
};

exports.photos = function(req, res){

	res.render('photos', { 
		title: 'Photos - Shea & Lindsey\'s Wedding',
        currentPage: 'photos'
    });
};

exports.rsvp = function(req, res){

	res.render('rsvp', { 
		title: 'RSVP - Shea & Lindsey\'s Wedding',
        currentPage: 'rsvp'
    });
};