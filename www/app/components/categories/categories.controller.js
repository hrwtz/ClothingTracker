(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('CategoriesController', CategoriesController);
	
	CategoriesController.$inject = ['$ionicPopup', 'ngDataFactory'];

	function CategoriesController ($ionicPopup, ngDataFactory) {
		var vm;
		vm = this;

		vm.openConfirmDeletePopup = openConfirmDeletePopup;

		init();

		function init () {
			updateCategories();
		}

		function openConfirmDeletePopup (category) {
			var confirmPopup = $ionicPopup.confirm({
				title: category.title,
				template: 'Are you sure you want to delete this category?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					ngDataFactory.remove(category);
					updateCategories();
				}
			});
		}

		function updateCategories () {
			ngDataFactory.find('Category').then(function (categories) {
				vm.categories = categories;
			});
		}
	}
	
})();