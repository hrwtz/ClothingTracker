(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.directive('ctColorPicker', ctColorPicker);
	
	ctColorPicker.$inject = ['$mdColorPicker'];

	function ctColorPicker ($mdColorPicker) {
		var directive = {
			restrict: 'AE',
			require: 'ngModel',
			transclude: true,
			templateUrl: 'app/common/directives/color-picker.html',
			link: link
		};

		return directive;

		function link (scope, element, attributes, ngModel) {
			scope.clickHandler = clickHandler;

			function clickHandler ($event) {
				$mdColorPicker.show({
					value: ngModel.$modelValue || '',
					$event: $event
				}).then(function (value) {
					ngModel.$setViewValue(value);
				});
			}

			ngModel.$modelValue
		}
	}
})();