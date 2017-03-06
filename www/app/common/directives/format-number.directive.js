(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.directive('ctFormatNumber', ctFormatNumber);
	
	ctFormatNumber.$inject = ['$filter'];

	function ctFormatNumber ($filter) {
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

			ngModel.$parsers.push(setValueToNumber);

			elem.bind('blur', updateValueOnBlur);

			function setModelFilterFormatter (a) {
				return $filter(attrs.ctFormatNumber)(ngModel.$modelValue);
			}

			function setValueToNumber (value) {
				var plainNumber = value.replace(/[^\d|\-+|\.+]/g, '');
				var parsedNumber = parseFloat(plainNumber);
                return isNaN(parsedNumber) ? undefined : parsedNumber;
            }

			function updateValueOnBlur (event) {
				var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
				elem.val(plainNumber ? $filter(attrs.ctFormatNumber)(plainNumber) : '');
			}
		}
	}
})();