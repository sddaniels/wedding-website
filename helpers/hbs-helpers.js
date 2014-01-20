module.exports = function(hbs) {

	var blocks = {};

	hbs.registerHelper('extend', function(name, context) {
		var block = blocks[name];
		if (!block) {
			block = blocks[name] = [];
		}
	
		block.push(context.fn(this));
	});

	hbs.registerHelper('block', function(name) {
		var val = (blocks[name] || []).join('\n');
	
		// clear the block
		blocks[name] = [];
		return val;
	});

	hbs.registerHelper('year', function() {
		return new Date().getFullYear();
	});

	hbs.registerHelper('ifCond', function(v1, v2, options) {
	  if(v1 === v2) {
		return options.fn(this);
	  }
	  return options.inverse(this);
	});

};