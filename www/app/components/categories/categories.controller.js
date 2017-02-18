(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('CategoriesController', CategoriesController);
	
	CategoriesController.$inject = ['$ionicPopup', '$scope', 'ngDataFactory'];

	function CategoriesController ($ionicPopup, $scope, ngDataFactory) {
		var vm;
		vm = this;

		vm.openConfirmDeletePopup = openConfirmDeletePopup;

		init();

		function init () {
			$scope.$on('$ionicView.beforeEnter', getCategories);
		}

		function openConfirmDeletePopup (category) {
			var confirmPopup = $ionicPopup.confirm({
				title: category.title,
				template: 'Are you sure you want to delete this category?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					ngDataFactory.remove(category).then(getCategories);
				}
			});
		}

		function getCategories () {
			ngDataFactory.find('Category').then(function (categories) {
				vm.categories = categories;
			});
		}
	}
	
})();