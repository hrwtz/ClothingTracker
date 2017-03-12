(function () {
	'use strict';

	angular
		.module('clothingTracker')
		.directive('ctColorPicker', ctColorPicker);
	
	ctColorPicker.$inject = ['$mdDialog'];

	function ctColorPicker ($mdDialog) {
		var directive = {
			restrict: 'AE',
			require: 'ngModel',
			transclude: true,
			templateUrl: 'app/common/directives/color-picker.html',
			link: link
		};

		return directive;

		function link (scope, element, attributes, ngModel) {
			scope.clickHandler = clickHandler;

			function clickHandler ($event) {
				var dialog = $mdDialog.show({
					templateUrl: 'app/common/directives/color-picker-dialog.html',
					controller: dialogController,
					controllerAs: 'vm',
					resolve: {
						ngModel: function () {
							return ngModel;
						}
					}
	            });

	            dialog.then(ngModel.$setViewValue);
			}
		}

		function dialogController (ngModel) {
			var vm = this;

			vm.palette = [
				["#ffcccc","#ffe6cc","#ffffcc","#ccffcc","#ccffe6","#ccffff","#cce6ff","#ccccff","#e6ccff","#ffccff"],
				["#ff9999","#ffcc99","#ffff99","#99ff99","#99ffcc","#99ffff","#99ccff","#9999ff","#cc99ff","#ff99ff"],
				["#ff6666","#ffb366","#ffff66","#66ff66","#66ffb3","#66ffff","#66b3ff","#6666ff","#b366ff","#ff66ff"],
				["#ff3333","#ff9933","#ffff33","#33ff33","#33ff99","#33ffff","#3399ff","#3333ff","#9933ff","#ff33ff"],
				["#ff0000","#ff8000","#ffff00","#00ff00","#00ff80","#00ffff","#0080ff","#0000ff","#8000ff","#ff00ff"],
				["#f50000","#f57b00","#f5f500","#00f500","#00f57b","#00f5f5","#007bf5","#0000f5","#7b00f5","#f500f5"],
				["#d60000","#d66c00","#d6d600","#00d600","#00d66c","#00d6d6","#006cd6","#0000d6","#6c00d6","#d600d6"],
				["#a30000","#a35200","#a3a300","#00a300","#00a352","#00a3a3","#0052a3","#0000a3","#5200a3","#a300a3"],
				["#5c0000","#5c2e00","#5c5c00","#005c00","#005c2e","#005c5c","#002e5c","#00005c","#2e005c","#5c005c"],
				["#ffffff","#cdcdcd","#b2b2b2","#999999","#7f7f7f","#666666","#4c4c4c","#333333","#191919","#000000"]
			];
			vm.color = ngModel.$viewValue;

			vm.close = $mdDialog.cancel;
			vm.ok = ok;

			function ok () {
				$mdDialog.hide(vm.color);
			}
		}
	}
})();