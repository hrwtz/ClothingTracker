(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('CategoriesController', CategoriesController);
	
	CategoriesController.$inject = ['ngDataFactory'];

	function CategoriesController (ngDataFactory) {
		var vm;

		vm = this;

		init();

		function init () {
			ngDataFactory.find('Category').then(function (categories) {
				vm.categories = categories;
			});
		}
	}
	
})();