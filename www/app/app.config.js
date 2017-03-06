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
			})
			.state('category_add', {
				url: '/categories/add',
				templateUrl: 'app/components/category-form/category-form.view.html',
				controller: 'CategoryFormController',
				controllerAs: 'vm'
			})
			.state('category_edit', {
				url: '/categories/:category_id/edit',
				templateUrl: 'app/components/category-form/category-form.view.html',
				controller: 'CategoryFormController',
				controllerAs: 'vm'
			})
			.state('clothing_item_add', {
				url: '/clothing_item/add',
				templateUrl: 'app/components/clothing-item-form/clothing-item-form.view.html',
				controller: 'ClothingItemFormController',
				controllerAs: 'vm'
			})
			.state('clothing_item_edit', {
				url: '/clothing_item/:clothing_item_id/edit',
				templateUrl: 'app/components/clothing-item-form/clothing-item-form.view.html',
				controller: 'ClothingItemFormController',
				controllerAs: 'vm'
			})
			.state('clothing_item_view', {
				url: '/clothing_item/:clothing_item_id',
				templateUrl: 'app/components/clothing-item-view/clothing-item-view.view.html',
				controller: 'ClothingItemViewController',
				controllerAs: 'vm'
			})
			.state('wear_log', {
				url: '/clothing_item/:clothing_item_id/wear_log',
				templateUrl: 'app/components/wear-log/wear-log.view.html',
				controller: 'WearLogController',
				controllerAs: 'vm'
			})
			.state('backup', {
				url: '/backup',
				templateUrl: 'app/components/backup/backup.view.html',
				controller: 'BackupController',
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