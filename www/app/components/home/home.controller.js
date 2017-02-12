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

		activate();

		return;

		function activate () {
			var promises = [Category.find(), ClothingItem.find()];

			$q.all(promises).then(function (values) {
				vm.categories = values[0];
            	vm.clothingItems = values[1];

            	nestData();
			});
		}

		function nestData () {
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
			console.log(vm.categories);
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