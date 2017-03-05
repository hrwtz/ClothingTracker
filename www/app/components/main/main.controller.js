(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('MainController', MainController);
	
	MainController.$inject = ['$ionicSideMenuDelegate'];

	function MainController ($ionicSideMenuDelegate) {
		var vm;
		vm = this;
		
		$ionicSideMenuDelegate.toggleLeft();
		
		vm.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};
	}
	
})();