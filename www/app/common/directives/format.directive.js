(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.directive('ctFormat', ctFormat);
	
	ctFormat.$inject = ['$filter'];

	function ctFormat ($filter) {
		var directive = {
			require: '?ngModel',
			link: link
		};

		return directive;

		function link (scope, elem, attrs, ngModel) {
			if (!ngModel) {
				return;
			}

			ngModel.$formatters.unshift(setModelFilterFormatter);

			elem.bind('blur', updateValueOnBlur);

			function setModelFilterFormatter (a) {
				return $filter(attrs.ctFormat)(ngModel.$modelValue);
			}

			function updateValueOnBlur (event) {
				var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
				elem.val(plainNumber ? $filter(attrs.ctFormat)(plainNumber) : '');
			}
		}
	}
})();