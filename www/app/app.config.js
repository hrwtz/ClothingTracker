(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.config(stateConfig)
		.config(databaseConfig);
	
	stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function stateConfig ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/components/home/home.view.html',
				controller: 'HomeController',
				controllerAs: 'vm'
			})
			.state('categories', {
				url: '/categories',
				templateUrl: 'app/components/categories/categories.view.html',
				controller: 'CategoriesController',
				controllerAs: 'vm'
			});
		$urlRouterProvider
			.otherwise('/');
	}

	databaseConfig.$inject = ['$databaseProvider'];

	function databaseConfig ($databaseProvider) {
		$databaseProvider.name = 'clothingTracker';
		$databaseProvider.description = 'Clothing Tracker Database';
		$databaseProvider.version = '1.0.0';
		$databaseProvider.size = 5 * 1024 * 1024;
	}
	
})();