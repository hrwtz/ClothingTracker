(function () {
	'use strict';

	angular
		.module('clothingTracker', ['ionic', 'ngData', 'ngMaterial', 'mdColorPicker'])
		.run(runBlock);
	
	runBlock.$inject = ['ionicFactory', 'ngDataFactory'];

	function runBlock (ionicFactory, ngDataFactory) {
		ionicFactory.initialize();
		ngDataFactory.initialize();
	}
})();