(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.directive('ctTovicColorPicker', ctTovicColorPicker);
	
	ctTovicColorPicker.$inject = ['$timeout'];

	function ctTovicColorPicker ($timeout) {
		return {
			restrict: 'AE',
			require: 'ngModel',
			link: link
		};

		function link (scope, element, attrs, ngModel) {
			var picker,
				timeout;

			picker = new CP(element[0], false);
		    picker.fit = setFitStyle;

		    init();

		    function init () {
		    	picker.enter(element[0]);
		    	picker.on('change', setNgModel);

		    	scope.$watch(getNgModelValue, setPickerValue);
		    }

		    function setFitStyle () {
		    	this.picker.style.left = this.picker.style.top = "";
		    }

		    function setNgModel (color) {
	    		ngModel.$setViewValue('#' + color);
		    }

		    function getNgModelValue () {
		    	return ngModel.$modelValue;
		    }

		    function setPickerValue (value) {
		    	if (timeout) {
	    			$timeout.cancel(timeout)
	    		}
	    		timeout = $timeout(function () {
	    			picker.set(value);
	    		}, 50);
		    }
		}
	}

})();