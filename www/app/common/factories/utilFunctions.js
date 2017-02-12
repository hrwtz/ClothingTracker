(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.factory('utilFunctions', utilFunctions);

	function utilFunctions () {
		var factory = {
			outerWidth: outerWidth
		};

		return factory;

		function outerWidth (el) {
			var width, 
				style;
			
			width = el.offsetWidth;
			style = getComputedStyle(el);
			width += parseInt(style.marginLeft) + parseInt(style.marginRight);
			
			return width;
		}
	}
	
})();