(function () {
	'use strict';

	angular
		.module('clothingTracker', ['ionic', 'ngCordova', 'ngData', 'ngMaterial'])
		.run(runBlock);
	
	runBlock.$inject = ['ionicFactory', 'ngDataFactory'];

	function runBlock (ionicFactory, ngDataFactory) {
		ionicFactory.initialize();
		ngDataFactory.initialize();
	}
})();