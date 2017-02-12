(function () {
	'use strict';

	angular
		.module('clothingTracker', ['ionic', 'ngData'])
		.run(ionicRun)
		.run(ngDataRun);
	
	ionicRun.$inject = ['$ionicPlatform'];

	function ionicRun ($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	}

	ngDataRun.$inject = ['$ngData'];

	function ngDataRun ($ngData) {
        $ngData.model('Clothing Item', {
            tableName: 'clothing_items',
            properties: {
            	brand: {
            		type: String,
            		required: true
            	},
				note: {
            		type: String,
            		required: true
            	},
            	color: {
            		type: String,
            		required: true
            	},
				cost: Number,
				date_created: {
            		type: Date,
            		required: true
            	},
				category_id: {
					type: Number,
					required: true
				}
            }
        });

        $ngData.model('Category', {
            tableName: 'categories',
            properties: {
            	title: {
            		type: String,
            		required: true,
            		unique: true
            	},
            	singular_title: {
            		type: String,
            		required: true,
            		unique: true
            	},
				date_created: {
            		type: Date,
            		required: true
            	}
            }
        });

   //      wear_log
			// id
			// clothing_id
			// date_created

        $ngData.initialize();
	}
})();