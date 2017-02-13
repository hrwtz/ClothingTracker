(function () {
	'use strict';

	angular
		.module('clothingTracker', ['ionic', 'ngData'])
		.run(runBlock);
	
	runBlock.$inject = ['ionicFactory', 'ngDataFactory'];

	function runBlock (ionicFactory, ngDataFactory) {
		ionicFactory.initialize();
		ngDataFactory.initialize();
	}
})();