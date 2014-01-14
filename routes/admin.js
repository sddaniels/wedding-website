
/*
 * GET admin login page.
 */

exports.index = function(req, res){
  res.render('admin', { title: 'Admin - Shea & Lindsey\'s Wedding',
                        layout: '' });
};

/*
 * GET admin dashboard page.
 */

exports.dashboard = function(req, res){
  res.render('admin-dashboard', { title: 'Admin - Shea & Lindsey\'s Wedding',
                                  layout: 'admin-layout' });
};

/*
 * GET admin rsvp page.
 */

exports.rsvp = function(req, res){
  res.render('admin-rsvp', { title: 'RSVP - Admin - Shea & Lindsey\'s Wedding',
                             layout: 'admin-layout',
                             currentPage: 'rsvp' });
};

/*
 * GET admin poll page.
 */

exports.poll = function(req, res){
  res.render('admin-poll', { title: 'Poll - Admin - Shea & Lindsey\'s Wedding',
                             layout: 'admin-layout',
                             currentPage: 'poll' });
};