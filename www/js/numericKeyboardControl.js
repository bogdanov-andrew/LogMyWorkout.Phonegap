(function(){ 
	var app = angular.module('NumericKeyboard',[ ]);
	app.directive('numericKeboard' ,function(){
		return {
			restrict: 'E',
			templateUrl: 'numeric-keyboard.html',
			controller: function(){
				
			},
			controllerAs: 'controller'
		};
	});
})();