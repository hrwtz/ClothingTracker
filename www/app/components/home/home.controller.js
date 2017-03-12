(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('HomeController', HomeController);
	
	HomeController.$inject = ['$q', '$scope', 'ngDataFactory', 'datesFactory'];

	function HomeController ($q, $scope, ngDataFactory, datesFactory) {
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
					sortClothingItems(category.clothing_items);
				});
			});
		}

		// TODO - Shouldn't be in controller
		function sortClothingItems (clothingItems) {
			clothingItems.sort(function (a, b) {
				return rgbToHue(a.color) - rgbToHue(b.color);
			});
		}

		function rgbToHue (rgb) {
			var r = parseInt(rgb.slice(1, 3), 16) / 255,
				g = parseInt(rgb.slice(3, 5), 16) /255,
				b = parseInt(rgb.slice(5, 7), 16) /255,
				max = Math.max(r, g, b),
				min = Math.min(r, g, b),
				h,
				d;

			if (max === min) {
				h = 0; // achromatic
			} else {
				d = max - min;
				switch(max){
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
				}
				h /= 6;
			}
			return h * 360;
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