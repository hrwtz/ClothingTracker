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