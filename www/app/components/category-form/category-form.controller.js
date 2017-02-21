(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('CategoryFormController', CategoryFormController);
	
	CategoryFormController.$inject = ['$scope', '$state', '$stateParams','ngDataFactory'];

	function CategoryFormController ($scope, $state, $stateParams, ngDataFactory) {
		var vm,
			isNew;

		isNew = $stateParams.category_id === undefined;

		vm = this;

		vm.pageTitle = (isNew ? 'Add' : 'Edit') + '  Category';
		vm.submit = submit;
		vm.backState = 'categories';

		init();

		function init () {
			$scope.$on('$ionicView.beforeEnter', setInitialCategory);
		}

		function submit () {
			var promise;
			if (isNew) {
				promise = ngDataFactory.create('Category', vm.category);
			} else {
				promise = ngDataFactory.update(vm.category);
			}
			promise.then(function (data) {
				$state.go(vm.backState);
			});
		}

		function setInitialCategory () {
			if (isNew) {
				vm.category = {};
			} else {
				ngDataFactory.findOne('Category', $stateParams.category_id).then(function (category) {
					vm.category = category;
				});
			}
		}
	}
	
})();