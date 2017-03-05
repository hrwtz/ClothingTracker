(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('HomeController', HomeController);
	
	HomeController.$inject = ['$q', '$scope', 'ngDataFactory'];

	function HomeController ($q, $scope, ngDataFactory) {
		var vm;
		vm = this;

		vm.addWearLog = addWearLog;
		vm.isLastWearRecent = isLastWearRecent;

		init();

		function init () {
			$scope.$on('$ionicView.beforeEnter', getCategoryData);
		}

		function getCategoryData () {
			vm.loaded = false;
			ngDataFactory.find('Category', {}, {'Clothing Item': {'Wear Log': true}}).then(function (categories) {
				vm.categories = categories;
				vm.loaded = true;
			});
		}

		function addWearLog (clothingItem) {
			var logItem = {
				clothing_item_id: clothingItem.id,
				date_worn: new Date().getTime()
			};
			ngDataFactory.create('Wear Log', logItem).then(function (data) {
				clothingItem.wear_log.push(data);
			});
		}

		function isLastWearRecent (clothingItem) {
			var wearLog = clothingItem.wear_log;
			if (!wearLog.length) {
				return false;
			}
			return isSameDay(new Date(+wearLog[wearLog.length - 1].date_worn));
		}

		function isSameDay (date1, date2) {
			date2 = date2 || new Date();
			var isSameDate = date1.getDate() == date2.getDate(),
				isSameMonth = date1.getMonth() == date2.getMonth(),
				isSameYear = date1.getYear() == date2.getYear();
			return isSameDate && isSameMonth && isSameYear;
		}
	}
	
})();