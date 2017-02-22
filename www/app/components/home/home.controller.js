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
			ngDataFactory.create('Wear Log', {clothing_item_id: clothingItem.id}).then(function (data) {
				clothingItem.wear_log.push(data);
			});
		}

		function isLastWearRecent (clothingItem) {
			var wearLog = clothingItem.wear_log;
			if (!wearLog.length) {
				return false;
			}
			return isDateToday(wearLog[wearLog.length - 1].date_created);
		}

		function isDateToday (date) {
			var now = new Date();
			date = new Date(date);
			var isSameDate = date.getDate() == now.getDate(),
				isSameMonth = date.getMonth() == now.getMonth(),
				isSameYear = date.getYear() == now.getYear();
			return isSameDate && isSameMonth && isSameYear;
		}
	}
	
})();