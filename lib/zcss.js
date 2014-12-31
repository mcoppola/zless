var less = require('less'),
	fs = require('fs');

this.resWidth = 27;
this.resHeight = 7;
this.layerTranslateX = 100;  //px
this.layerTranslateY = 50;  //px
this.layerRotateY = 100;  //deg
this.layerRotateX = 20;  //deg
this.transitionTime = 0.15; //s
this.transitionCurve = 'linear';
this.layerCSSPath = '~ .layers > .p-group > .layer > .outer > .box';
this.s = '';

var setSectionPosition = function(w, h) {
	var s = ' ';
	s += 'section { ';
	for (var i=1; i<(w*h + 1); i++) {

		s += '&:nth-of-type(' + i + '){';	

		s += 'top: ' + ((100/h) * Math.floor((i-1)/w)) + '%;' ;
		s += 'left: ' + ( ((100/w) * (i-1)) - (100*Math.floor((i-1)/w)) )+ '%;' ;
		s += 'width: ' + (100/w) + 'vw;';
		s += 'height: ' + (100/h) + 'vh;';

		s += '}';
	}	
	s += '}';
	return s;
}

var setSectionHoverTransform = function(w, h, dX, dY, drX, drY, cssPath) {
	var s = ' ';

	for (var i=1; i<=h; i++) {

		for (var j=1; j<=w; j++) {
			s += 'section:nth-of-type(' + (((i-1)*w) + j) + '):hover ' + cssPath + ' {';	

			
			if (j != w && j%(w/2) <=0.5) {  // If it's the middle set no offset
				// translate
				s += 'left: 0; top: ' + (dY - (dY * Math.abs(i/(h/2)) )) + 'px;';
				// rotate
				s += 'transform: rotateY(' + (drY - (drY * Math.abs(j/(w/2)) )) + 'deg) ' +'rotateX(' + (-drX + (drX * Math.abs(i/(h/2)) )) + 'deg);';
			} else {
				// translate
				s += 'left: ' + (dX - (dX * Math.abs(j/(w/2)) )) + 'px;';
				s += 'top: ' + (dY - (dY * Math.abs(i/(h/2)) )) + 'px;';
				// rotate
				s += 'transform: rotateY(' + (drY - (drY * Math.abs(j/(w/2)) )) + 'deg) ' +'rotateX(' + (-drX + (drX * Math.abs(i/(h/2)) )) + 'deg);';
			}

			s += '}';
		}
	}	
	return s; 
}

var setTransitions = function(d, curve, cssPath) {
	var s = 'section ' + cssPath + ' {';
		s += '-webkit-transition:left ' + d + 's ' + curve + ', right ' + d + 's ' + curve + ', top ' + d + 's ' + curve + ', bottom ' + d + 's ' + curve + ', transform ' + d + 's ' + curve + ';';
		s += 'transition:left ' + d + 's ' + curve + ', right ' + d + 's ' + curve + ', top ' + d + 's ' + curve + ', bottom ' + d + 's ' + curve + ', transform ' + d + 's ' + curve + ';'
		s += '}';
	return s;
}




this.s += setSectionPosition(this.resWidth, this.resHeight);
this.s += setSectionHoverTransform(this.resWidth, this.resHeight, this.layerTranslateX, this.layerTranslateY, this.layerRotateX, this.layerRotateY, this.layerCSSPath);
this.s += setTransitions(this.transitionTime, this.transitionCurve, this.layerCSSPath);


less.render(this.s)
	.then(function(css) {
		fs.writeFile(__dirname + "/../public/stylesheets/sectionPosition.css", css.css, function(e) {
		    if(e) {
		        console.log(e);
		    }
		});
	},
	function(e) {
    	console.log(e);
});

module.exports = this;