(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.factory('persistenceFactory', persistenceFactory);
	
	persistenceFactory.$inject = ['$q'];

	function persistenceFactory ($q) {
		return {};
		persistence.store.websql.config(persistence, 'app_db', '0.0.1', 'Clothing Tracker Database', 5 * 1024 * 1024, 0);
		persistence.debug = true;

		var Clothing, Category, WearLog;

		Clothing = persistence.define('Clothing', {
			brand: 'TEXT',
			note: 'TEXT',
			cost: 'INT',
			date_created: 'DATE'
		});

		Category = persistence.define('Category', {
			title: 'TEXT',
			date_created: 'DATE'
		});

		WearLog = persistence.define('WearLog', {
			date_created: 'DATE'
		});

		Clothing.hasMany('wear_logs', WearLog, 'clothing');

		Category.hasMany('clothes', Clothing, 'category');
		Category.index('title', {unique: true});

		persistence.schemaSync();

		return {
			Clothing: Clothing,
			Category: Category,
			WearLog: WearLog,
			add: add
		};

		function add (object) {
			var defer = $q.defer();

			object.date_created = new Date();

			persistence.add(object);
			persistence.flush(function (test) {
				defer.resolve(test);
			});

			return defer.promise;
		}
	}
})();