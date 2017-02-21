(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('ClothingItemFormController', ClothingItemFormController);
	
	ClothingItemFormController.$inject = ['$state', '$stateParams','ngDataFactory'];

	function ClothingItemFormController ($state, $stateParams, ngDataFactory) {
		var vm,
			isNew;

		isNew = $stateParams.clothing_item_id === undefined;

		vm = this;

		vm.pageTitle = (isNew ? 'Add' : 'Edit') + '  Clothing Item';
		vm.submit = submit;

		init();

		function init () {
			setInitialClothinItem();
			getAllCategories();
		}

		function setInitialClothinItem () {
			if (isNew) {
				vm.clothingItem = {};
			} else {
				ngDataFactory.findOne('Clothing Item', $stateParams.clothing_item_id).then(function (clothingItem) {
					vm.clothingItem = clothingItem;
				});
			}
		}

		function getAllCategories () {
			ngDataFactory.find('Category').then(function (categories) {
				vm.categories = categories;
			});
		}

		function submit () {
			var promise;
			if (isNew) {
				promise = ngDataFactory.create('Clothing Item', vm.clothingItem);
			} else {
				promise = ngDataFactory.update(vm.clothingItem);
			}
			promise.then(function (data) {
				$state.go('home');
			});
		}
	}
	
})();