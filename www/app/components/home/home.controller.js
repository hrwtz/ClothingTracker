(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('HomeController', HomeController);
	
	HomeController.$inject = ['$q', '$scope', 'ngDataFactory'];

	function HomeController ($q, $scope, ngDataFactory) {
		var vm;

		vm = this;

		init();

		function init () {
			$scope.$on('$ionicView.beforeEnter', getCategoryData);
		}

		function getCategoryData () {
			vm.loaded = false;
			ngDataFactory.find('Category', {}, {'Clothing Item': true}).then(function (categories) {
				vm.categories = categories;
				vm.loaded = true;
			});
		}

	}
	
})();