(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.factory('colorsFactory', colorsFactory);

	function colorsFactory () {
		var factory = {
			sortByColor: sortByColor
		};

		return factory;

		function sortByColor (items, key) {
			return angular.copy(items).sort(function (a, b) {
				return rgbToHue(a[key]) - rgbToHue(b[key]);
			});
		}

		function rgbToHue (rgb) {
			var r = parseInt(rgb.slice(1, 3), 16) / 255,
				g = parseInt(rgb.slice(3, 5), 16) /255,
				b = parseInt(rgb.slice(5, 7), 16) /255,
				max = Math.max(r, g, b),
				min = Math.min(r, g, b),
				h,
				d;

			if (max === min) {
				h = 0; // achromatic
			} else {
				d = max - min;
				switch(max){
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
				}
				h /= 6;
			}
			return h * 360;
		}
	}

})();