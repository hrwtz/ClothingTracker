(function () {
	'use strict';

	angular
		.module('clothingTracker', ['ionic'])
		.config(stateConfig)
		.config(databaseConfig);
	
	stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function stateConfig ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('tabs', {
				url: '/',
				templateUrl: 'app/components/home/home.view.html',
				controller:"HomeController"
			});
		$urlRouterProvider
			.otherwise('/');
	}

	databaseConfig.$inject = ['$databaseProvider'];

	function databaseConfig ($databaseProvider) {
		//configure database
		$databaseProvider.name = 'books';
		$databaseProvider.description = 'Books database';
		$databaseProvider.version = '1.0.0';
		$databaseProvider.size = 4 * 1024 * 1024;

	}
	
})();