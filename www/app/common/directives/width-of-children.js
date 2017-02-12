(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.directive('widthOfChildren', widthOfChildren);
	
	widthOfChildren.$inject = ['utilFunctions'];

	function widthOfChildren (utilFunctions) {
		var directive = {
			restrict: 'AE',
			link: link
		};

		return directive;

		function link (scope, element, attributes) {
			scope.$watch(function () {
				return element.children().length;
			}, function (childrenLength) {
				if (!childrenLength) {
					return false;
				}
				var children = element.children();
				var width = 0;
				angular.forEach(element.children(), function (child) {
					width += utilFunctions.outerWidth(child);
				});
				element.css('width', width + 'px');
			});
		}
	}
	
})();