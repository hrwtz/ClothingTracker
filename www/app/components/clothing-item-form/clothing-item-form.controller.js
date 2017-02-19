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
		vm.color = '#fff';

		init();

		function init () {
			if (isNew) {
				vm.category = {};
			} else {
				ngDataFactory.findOne('Category', $stateParams.clothing_item_id).then(function (category) {
					vm.category = category;
				});
			}
		}

		function submit () {
			var promise;
			if (isNew) {
				promise = ngDataFactory.create('Category', vm.category);
			} else {
				promise = ngDataFactory.update(vm.category);
			}
			promise.then(function (data) {
				$state.go('categories');
			});
		}
	}
	
})();