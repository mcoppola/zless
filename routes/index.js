var zcss = require('../lib/zcss');

module.exports = function (app) {
    app.get('/', index);
};

var index = function (req, res) {
	var s = '';

	for (i=0; i<(zcss.resWidth*zcss.resHeight); i++) {
		s += '<section></section>'
	}

    res.render('index', { 

    	title: 'MUSEY | LAND',
    	sections: function() {
    		return s
    	}

    });
};