(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.controller('HomeController', HomeController);
	
	HomeController.$inject = ['$q', '$ngData'];

	function HomeController ($q, $ngData) {
		var vm,
			Category,
			ClothingItem;

		vm = this;
		Category = $ngData.model('Category');
		ClothingItem = $ngData.model('Clothing Item');

		init();

		return;

		function init () {
			var contain = {
				Category: {
					'Clothing Item': true
				}
			};

			find('Category', {}, {'Clothing Item': true}).then(function (values) {
				vm.categories = values['Category'];
            	vm.clothingItems = values['Clothing Item'];
            	nestData(contain, values);
			});
		}

		function find (modelName, conditions, contain, finalResults) {
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
						allPromises.push(find(containModel, {[$ngData.model(modelName).definition.referenceName + '_id']: {$in: resultIds}}, contain[containModel], finalResults));
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
				result = values[Object.keys(contain)[0]];
			}
			contain = contain[Object.keys(contain)[0]];

			result.forEach(function (object) {
				var contains = Object.keys(contain);
				contains.forEach(function (containModel) {
					object[$ngData.model(containModel).tableName] = _.where(values[containModel], {category_id: object.id})
				});
			});

			vm.categories = result;

			console.log(result);
			return;


			result = result || {};


			var contains = Object.keys(contain);
			contains.forEach(function (containModel) {
				// result[containModel]
			});


			console.log(contain);
			console.log(values);
			return;
			// Set up hash so we can efficiently know the index and set up empty array
			// to store clothing items in
			var hash = {};
			var i = 0;
			vm.categories.forEach(function (category) {
				category.clothingItems = [];
				hash[category.id] = i;
				i++;
			});

			vm.clothingItems.forEach(function (clothingItem) {
				vm.categories[hash[clothingItem.category_id]].clothingItems.push(clothingItem);
			});
		}



		return;
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
	
})();