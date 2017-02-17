(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('CategoryFormController', CategoryFormController);
	
	CategoryFormController.$inject = ['$state', '$stateParams','ngDataFactory'];

	function CategoryFormController ($state, $stateParams, ngDataFactory) {
		var vm,
			isNew;

		isNew = $stateParams.category_id === undefined;

		vm = this;

		vm.pageTitle = (isNew ? 'Add' : 'Edit') + '  Category';
		vm.submit = submit;

		init();

		function init () {
			if (isNew) {
				vm.category = {};
			} else {
				ngDataFactory.findOne('Category', $stateParams.category_id).then(function (category) {
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