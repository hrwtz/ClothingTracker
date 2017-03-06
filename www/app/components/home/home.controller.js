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

				vm.categories.forEach(function (category) {
					sortClothingItems(category.clothing_items);
				});
			});
		}

		// TODO - Shouldn't be in controller
		function sortClothingItems (clothingItems) {
			clothingItems.sort(function (a, b) {
				return rgbToHsl(a.color)[0] - rgbToHsl(b.color)[0];
			});
		}

		function rgbToHsl (rgb) {
			var r = parseInt(rgb.slice(1, 3), 16) / 255,
				g = parseInt(rgb.slice(3, 5), 16) /255,
				b = parseInt(rgb.slice(5, 7), 16) /255;
			var max = Math.max(r, g, b),
				min = Math.min(r, g, b);
			var h,
				s,
				l = (max + min) / 2;

			if (max === min) {
				h = s = 0; // achromatic
			} else {
				var d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch(max){
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
				}
				h /= 6;
			}
			return new Array(h * 360, s * 100, l * 100);
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

		// TODO - Shouldn't be in controller
		function isSameDay (date1, date2) {
			date2 = date2 || new Date();
			var isSameDate = date1.getDate() == date2.getDate(),
				isSameMonth = date1.getMonth() == date2.getMonth(),
				isSameYear = date1.getYear() == date2.getYear();
			return isSameDate && isSameMonth && isSameYear;
		}
	}
	
})();