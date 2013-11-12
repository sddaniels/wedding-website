
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Shea & Lindsey\'s Wedding' });
};

/*
 * GET Florida Wedding page.
 */

exports.florida = function(req, res){
  res.render('florida', { title: 'Florida - Shea & Lindsey\'s Wedding',
                          currentPage: 'florida' });
};

/*
 * GET Iowa Reception page.
 */

exports.iowa = function(req, res){
  res.render('iowa', { title: 'Iowa - Shea & Lindsey\'s Wedding',
                       currentPage: 'iowa' });
};

/*
 * GET Registry page.
 */

exports.registry = function(req, res){
  res.render('registry', { title: 'Registry - Shea & Lindsey\'s Wedding',
                           currentPage: 'registry' });
};

/*
 * GET Photos page.
 */

exports.photos = function(req, res){
  res.render('photos', { title: 'Photos - Shea & Lindsey\'s Wedding',
                         currentPage: 'photos' });
};

/*
 * GET RSVP page.
 */

exports.rsvp = function(req, res){
  res.render('rsvp', { title: 'RSVP - Shea & Lindsey\'s Wedding',
                       currentPage: 'rsvp' });
};
