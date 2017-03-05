(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.filter('colorName', colorName);

	colorName.$inject = ['colorNamesFactory'];

	function colorName (colorNamesFactory) {
		var colorNames;

		init();

		return getName;

		function init () {
			var color, 
				rgb, 
				hsl;
			colorNames = colorNamesFactory.getColorNames();

			for (var i = 0; i < colorNames.length; i++) {
				color = "#" + colorNames[i][0];
				rgb = hexToRgb(color);
				hsl = hslToRgb(color);
				colorNames[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
			}
		}

		function getName (color) {
			color = color || '';
			color = color.toUpperCase();
			if (color.length < 3 || color.length > 7) {
				return color;
			}
			if (color.length % 3 == 0) {
				color = "#" + color;
			}
			if (color.length == 4) {
				color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);
			}

			var rgb = hexToRgb(color),
				r = rgb[0], 
				g = rgb[1], 
				b = rgb[2],
				hsl = hslToRgb(color),
				h = hsl[0], 
				s = hsl[1], 
				l = hsl[2],
				ndf1 = 0,
				ndf2 = 0, 
				ndf = 0,
				cl = -1, 
				df = -1;

			for (var i = 0; i < colorNames.length; i++) {
				if (color == "#" + colorNames[i][0]) {
					return colorNames[i][1];
				}

				ndf1 = Math.pow(r - colorNames[i][2], 2) + Math.pow(g - colorNames[i][3], 2) + Math.pow(b - colorNames[i][4], 2);
				ndf2 = Math.pow(h - colorNames[i][5], 2) + Math.pow(s - colorNames[i][6], 2) + Math.pow(l - colorNames[i][7], 2);
				ndf = ndf1 + ndf2 * 2;

				if (df < 0 || df > ndf) {
					df = ndf;
					cl = i;
				}
			}

			return (cl < 0 ? color : colorNames[cl][1]);
		}

		function hslToRgb (color) {
			var min, 
				max, 
				delta, 
				h, 
				s, 
				l,
				rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255],
				r = rgb[0], 
				g = rgb[1], 
				b = rgb[2];

			min = Math.min(r, Math.min(g, b));
			max = Math.max(r, Math.max(g, b));
			delta = max - min;
			l = (min + max) / 2;

			s = 0;
			if(l > 0 && l < 1)
			s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

			h = 0;
			if (delta > 0) {
				if (max == r && max != g) {
					h += (g - b) / delta;
				}
				if (max == g && max != b){
					h += (2 + (b - r) / delta);	
				}
				if (max == b && max != r){
					h += (4 + (r - g) / delta);	
				}
				h /= 6;
			}
			return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
		}

		function hexToRgb (color) {
			return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)), parseInt('0x' + color.substring(5, 7))];
		}
	}

})();





(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.directive('ctPlaceholder', ctPlaceholder);

	function ctPlaceholder () {
		var directive = {
			restrict: 'A',
			require: 'ngModel',
			link: link
		};

		return directive;

		function link (scope, element, attributes, ngModel) {
			scope.$watch(function () {
				return ngModel.$modelValue;
			}, function(model) {
				if (model === undefined) {
					element.addClass('item-placeholder');
				} else {
					element.removeClass('item-placeholder');
				}
			});
		}
	}
})();