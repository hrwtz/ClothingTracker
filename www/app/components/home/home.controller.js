(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('HomeController', HomeController);
	
	HomeController.$inject = ['$q', 'ngDataFactory'];

	function HomeController ($q, ngDataFactory) {
		var vm;

		vm = this;

		init();

		function init () {
			ngDataFactory.find('Category', {}, {'Clothing Item': true}).then(function (categories) {
				vm.categories = categories;
			});
		}

	}
	
})();