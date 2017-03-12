(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.factory('datesFactory', datesFactory);

	function datesFactory () {
		var factory = {
			isSameDay: isSameDay
		};

		return factory;

		function isSameDay (date1, date2) {
			date2 = date2 || new Date();
			var isSameDate = date1.getDate() == date2.getDate(),
				isSameMonth = date1.getMonth() == date2.getMonth(),
				isSameYear = date1.getYear() == date2.getYear();
			return isSameDate && isSameMonth && isSameYear;
		}
	}

})();