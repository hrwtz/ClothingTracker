(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('ClothingItemViewController', ClothingItemViewController);
	
	ClothingItemViewController.$inject = ['$scope', '$state', '$stateParams','ngDataFactory'];

	function ClothingItemViewController ($scope, $state, $stateParams, ngDataFactory) {
		var vm;

		vm = this;

		vm.backState = 'home';

		init();

		function init () {
			$scope.$on('$ionicView.beforeEnter', setInitialClothingItem);
		}

		function setInitialClothingItem () {
			ngDataFactory.findOne('Clothing Item', $stateParams.clothing_item_id).then(function (clothingItem) {
				vm.clothingItem = clothingItem;

				// TODO - fix ngDataFactory so this isn't necessary
				ngDataFactory.findOne('Category', vm.clothingItem.category_id).then(function (category) {
					vm.clothingItem.category = category;

					vm.pageTitle = clothingItem.brand + ' ' + category.title;
				});

				ngDataFactory.find('Wear Log', {clothing_item_id: vm.clothingItem.id}).then(function (wearLog) {
					vm.clothingItem.wearLog = wearLog;
				});
			});
		}
	}
	
})();