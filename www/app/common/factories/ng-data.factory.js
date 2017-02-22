(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.factory('ngDataFactory', ngDataFactory);

	ngDataFactory.$inject = ['$ngData', '$q'];

	function ngDataFactory ($ngData, $q) {
		var factory = {
			initialize: initialize,
			find: find,
			findOne: findOne,
			create: create,
			update: update,
			remove: remove
		};

		return factory;

		function initialize () {
			$ngData.model('Clothing Item', {
	            tableName: 'clothing_items',
	            referenceName: 'clothing_item',
	            properties: getClothingItemProperties(),
	            associations: ['Wear Log']
	        });

	        $ngData.model('Category', {
	            tableName: 'categories',
	            referenceName: 'category',
	            properties: getCategoryProperties(),
	            associations: ['Clothing Item']
	        });

	        $ngData.model('Wear Log', {
	            tableName: 'wear_log',
	            referenceName: 'wear_log',
	            properties: getWearLogProperties()
	        });

	        $ngData.initialize();
		}

		function find (modelName, conditions, contain) {
			var d = $q.defer();

			recursive(modelName, conditions, contain).then(function (results) {
				d.resolve(nestData(contain, results));
			});

			return d.promise;


			function recursive (modelName, conditions, contain, finalResults) {
				var d = $q.defer();
				var model = $ngData.model(modelName);

				conditions = conditions || [];
				contain = contain || {};
				finalResults = finalResults || {};

				var query = getQuery(model, conditions);

				query.then(function (results) {
					finalResults[modelName] = results;
					var resultIds = _.pluck(results, 'id');
					if (Object.keys(contain).length) {
						var allPromises = [];
						for (var containModel in contain) {
							allPromises.push(recursive(containModel, {[$ngData.model(modelName).definition.referenceName + '_id']: {$in: resultIds}}, contain[containModel], finalResults));
						}
						$q.all(allPromises).then(function () {
							d.resolve(finalResults);
						});
					} else {
						d.resolve(finalResults);
					}
				});
				return d.promise;
			}
		}

		function findOne (modelName, id) {
			return $ngData.model(modelName).findOne({id: id});
		}

		function create (modelName, object) {
			object.date_created = object.date_created = new Date().toString();
			return $ngData.model(modelName).create(object);
		}

		function update (object) {
			return object.save();
		}

		function remove (object) {
			return object.remove();
		}

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

	    function getQuery (model, conditions) {
			var query;
			if (!Object.keys(conditions).length) {
				query = model.find();
			} else {
				for (var i = 0; i < Object.keys(conditions).length; i++) {
					var method = i === 0 ? 'where' : 'and';
					query = model[method](Object.keys(conditions)[i], conditions[Object.keys(conditions)[i]]);
				}
			}
			return query;
		}

		function nestData (contain, values, result) {
			if (!result) {
				result = values['Category'];
			}

			result.forEach(function (object) {
				if (!contain) {
					return;
				}
				var contains = Object.keys(contain);
				contains.forEach(function (containModel) {
					object[$ngData.model(containModel).tableName] = _.where(values[containModel], {category_id: object.id})
					object[$ngData.model(containModel).tableName].forEach(function (dataObject) {
						dataObject.wear_log = _.where(values['Wear Log'], {clothing_item_id: dataObject.id})
					});

				});
			});
			return result;
		}

		function importData () {
			var Category = $ngData.model('Category');
			var ClothingItem = $ngData.model('Clothing Item');
			var cats = ['Pants', 'Button Downs', 'T-Shirts', 'Sweaters']

			for (var cat in cats) {
				Category.create({
					title: cats[cat],
					singular_title: cats[cat].substring(0, cats[cat].length - 1),
					date_created: new Date().toString()
				}).then(function (category) {
					console.log(category);
				}).catch(function (error) {
					console.log(error);
					for (var i = 0; i < 4; i++) {
						ClothingItem.create({
							brand: 'Ted Baker',
							note: 'Flower Pattern',
							cost: 20.30,
							color: '#606dbc',
							date_created: new Date().toString(),
							category_id: Math.floor(Math.random() * 4) + 1
						});
					}
				});
			}
		}
	}

})();