(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('BackupController', BackupController);
	
	BackupController.$inject = ['$q', '$cordovaFile', 'ngDataFactory'];

	function BackupController ($q, $cordovaFile, ngDataFactory) {
		var vm;
		vm = this;

		vm.downloadBackup = downloadBackup;

		function downloadBackup () {
			getBackupData().then(function (data) {
				// $cordovaFile.createFile()
			});
		}

		function getBackupData () {
			var result,
				models,
				promises,
				deferred;

			result = {};

			models = [
				'Clothing Item',
				'Category',
				'Wear Log'
			];

			promises = [];

			deferred = $q.defer();

			models.forEach(function (model) {
				promises.push(ngDataFactory.find(model))
			});

			$q.all(promises).then(function (data) {
				models.forEach(function (model, i) {
					result[model] = data[i];
				});
				deferred.resolve(result);
			});

			return deferred.promise;
		}
	}
	
})();