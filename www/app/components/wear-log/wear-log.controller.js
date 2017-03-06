(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('WearLogController', WearLogController);
	
	WearLogController.$inject = ['$ionicPopup', '$scope', '$stateParams', 'ngDataFactory'];

	function WearLogController ($ionicPopup, $scope, $stateParams, ngDataFactory) {
		var vm;
		vm = this;

		vm.openConfirmDeletePopup = openConfirmDeletePopup;
		vm.addLogItem = addLogItem;
		vm.dateFilter = dateFilter;

		init();

		function init () {
			vm.datePickerMaxDate = new Date();

			$scope.$on('$ionicView.beforeEnter', getWearLog);
		}

		function openConfirmDeletePopup (logItem) {
			var confirmPopup = $ionicPopup.confirm({
				title: logItem.title,
				template: 'Are you sure you want to delete this item?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					ngDataFactory.remove(logItem).then(getWearLog);
				}
			});
		}

		function getWearLog () {
			ngDataFactory.find('Wear Log', {clothing_item_id: $stateParams.clothing_item_id}).then(function (wearLog) {
				vm.wearLog = wearLog;
				vm.wearLog.sort(function (a, b) {
					return a.date_worn - b.date_worn;
				});
			});
		}

		function addLogItem () {
			var logItem = {
				clothing_item_id: $stateParams.clothing_item_id,
				date_worn: vm.newDate.getTime()
			};

			ngDataFactory.create('Wear Log', logItem).then(function (data) {
				vm.newDate = undefined;
				getWearLog();
			});
		}

		function dateFilter (date) {
			var isAlreadyLogged = false;
			vm.wearLog.forEach(function (logItem) {
				if (isSameDay(date, new Date(+logItem.date_worn))) {
					isAlreadyLogged = true;
				}
			});
			return !isAlreadyLogged;
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