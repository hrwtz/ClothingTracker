(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('HomeController', HomeController);
	
	HomeController.$inject = ['$q', '$scope', 'ngDataFactory', 'datesFactory', 'colorsFactory'];

	function HomeController ($q, $scope, ngDataFactory, datesFactory, colorsFactory) {
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

				vm.categories.forEach(function (category) {
					category.clothing_items = colorsFactory.sortByColor(category.clothing_items, 'color');
				});
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
			return datesFactory.isSameDay(new Date(+wearLog[wearLog.length - 1].date_worn));
		}
	}
	
})();