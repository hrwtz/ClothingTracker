(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.factory('ngDataFactory', ngDataFactory);

	ngDataFactory.$inject = ['$ngData'];

	function ngDataFactory ($ngData) {
		var factory = {
			initialize: initialize
		};

		return factory;

		function initialize () {
			$ngData.model('Clothing Item', {
	            tableName: 'clothing_items',
	            referenceName: 'clothing_item',
	            properties: getClothingItemProperties()
	        });

	        $ngData.model('Category', {
	            tableName: 'categories',
	            referenceName: 'category',
	            properties: getCategoryProperties(),
	            associations: ['Clothing Item']
	        });

	        $ngData.initialize();

	        function getClothingItemProperties () {
	        	return {
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
	            };
	        }

	        function getCategoryProperties () {
	        	return {
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
	        	};
	        }

	        function getWearLogProperties () {
	        	return {
	        		date_created: {
	            		type: Date,
	            		required: true
	            	},
	            	clothing_item_id: {
						type: Number,
						required: true
					}
	        	};
	        }
		}
	}

})();