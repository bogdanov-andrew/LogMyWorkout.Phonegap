(function(){ 
	var app = angular.module('TimerPage',[ ]);
	app.controller('TimerPageController', ['$interval', '$scope' ,function($interval, $scope){
		$scope.keyboardValue = "";
		
		$('#button1').on('touchend',function(){
			$scope.keyPressedF(1);
		});
		$('#button2').on('touchend',function(){
			$scope.keyPressedF(2);
		});
		$('#button3').on('touchend',function(){
			$scope.keyPressedF(3);
		});
		$('#button4').on('touchend',function(){
			$scope.keyPressedF(4);
		});
		$('#button5').on('touchend',function(){
			$scope.keyPressedF(5);
		});
		$('#button6').on('touchend',function(){
			$scope.keyPressedF(6);
		});
		$('#button7').on('touchend',function(){
			$scope.keyPressedF(7);
		});
		$('#button8').on('touchend',function(){
			$scope.keyPressedF(8);
		});
		$('#button9').on('touchend',function(){
			$scope.keyPressedF(9);
		});
		$('#button0').on('touchend',function(){
			$scope.keyPressedF(0);
		});
		$('#buttonDOT').on('touchend',function(){
			$scope.keyPressedF('DOT');
		});
		$('#buttonDEL').on('touchend',function(){
			$scope.keyPressedF('DEL');
		});
		
		var timer;
		var timerPosition = 15;
		function onTimer() {
				console.log('working: ' + timerPosition);
				<!-- change UI into time show -->
				if(timerPosition-1 > 0){
					timerPosition--;
				}else{
					if(angular.isDefined(timer)){
						$interval.cancel(timer);
						timer = undefined;
						<!-- hide timer, change UI on timer stop -->
					}
				}
			};

		this.startTimer = function() {
			if(angular.isDefined(timer)){
					return;
			}
			timer = $interval(onTimer,1000);
		};
		
		function updateValue(){
			$('#textField1').val($scope.keyboardValue);
		}

		$scope.keyPressedF = function(key){
			switch(key){
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9:
					case 0:				
						var result = $scope.keyboardValue.concat(key.toString());
						$scope.keyboardValue = result;
						break;
					case "DEL":
						var result = $scope.keyboardValue.substring(0,$scope.keyboardValue.length-1);
						$scope.keyboardValue = result;
						break;
					case "DOT":
						var pos = $scope.keyboardValue.indexOf('.');
						if(pos === -1 && $scope.keyboardValue > 0){
							var result = $scope.keyboardValue.concat('.'.toString());
							$scope.keyboardValue = result;
						}
						break;
					default:
						break;
			}

			updateValue();
		}

		this.keyPressed = function(key) {
			keyPressedF(key);
		}
	}]);
	app.directive('numericKeboard' ,function(){
		return {
			restrict: 'E',
			templateUrl: 'numerickeyboard.html',
			controller: function(){
				
			},
			controllerAs: 'controller'
		};
	});
})();