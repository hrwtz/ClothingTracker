(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('HomeController', HomeController);
	
	HomeController.$inject = ['persistenceFactory'];

	function HomeController () {
		// console.log(persistenceFactory);

		// var category = new persistenceFactory.Category({title: 'Pants'});

		// persistenceFactory.add(category).then(function (data) {
		// 	console.log(data);
		// });
	}
	
})();