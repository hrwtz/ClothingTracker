(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('BackupController', BackupController);
	
	BackupController.$inject = ['$mdToast', '$q', '$cordovaFile', 'ngDataFactory'];

	function BackupController ($mdToast, $q, $cordovaFile, ngDataFactory) {
		var vm;
		vm = this;

		vm.downloadBackup = downloadBackup;

		function downloadBackup () {
			getBackupData().then(function (data) {
				var date = new Date(),
					dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'),
					directoryName = 'clothingTracker',
					pathName = cordova.file.dataDirectory + directoryName + '/',
					fileName = 'backup ' + dateString + '.json',
					toast = $mdToast.simple().hideDelay(3000);

				$cordovaFile.createDir(cordova.file.dataDirectory, directoryName).then(function (result) {
					return $cordovaFile.writeFile(pathName, fileName, data, true);
				}, function (err) {
					return $cordovaFile.writeFile(pathName, fileName, data, true);
				}).then(function (result) {
					toast.textContent('Backup saved successfully!');
					$mdToast.show(toast);
				}).catch(function (err) {
					toast.textContent('There was an error creating a backup.');
					$mdToast.show(toast);
				});
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