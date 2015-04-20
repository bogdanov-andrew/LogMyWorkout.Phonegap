(function(){ 
	var app = angular.module('TimerPage',[ ]);
	app.controller('TimerPageController', ['$interval', '$scope' ,function($interval, $scope){
		$scope.keyboardValue = "";
        function disableControl(controlName){
            $(controlName).fadeTo('fast',0.3);
        };

        function enableControl(controlName){
            $(controlName).fadeTo('fast',1);
        };

        disableControl('#buttonRestart');

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
        var timerInitialValue = 0;
        var timerPosition = timerInitialValue;
        function convertFullTimeToSeconds(hours, minutes, seconds){
            var resultSeconds = seconds * 1.0;
            resultSeconds += minutes * 1.0 * 60;
            resultSeconds += hours * 1.0 * 60 * 60;

            return resultSeconds;
        }

        function stopTimer(){
           if(angular.isDefined(timer)){
				$interval.cancel(timer);
				timer = undefined;
				<!-- hide timer, change UI on timer stop -->
           }
           timerPosition = timerInitialValue;

            $('#buttonStartStop').text('Start');
            $('#buttonStartStop').removeClass('btn-danger');
            $('#buttonStartStop').addClass('btn-primary');

            enableControl('#keypad');
            disableControl('#buttonRestart');
            $(".keypad-btn-width").attr('disabled', false);
        };

        function startTimer() {
            if(angular.isDefined(timer)){
                return;
            }

            var hours = $('#hoursValue').text();
            var minutes = $('#minutesValue').text();
            var seconds = $('#secondsValue').text();

            timerPosition = convertFullTimeToSeconds(hours, minutes, seconds);
            timerInitialValue = timerPosition;

            timer = $interval(onTimer,1000);

            $('#buttonStartStop').text('Stop');
            $('#buttonStartStop').removeClass('btn-primary');
            $('#buttonStartStop').addClass('btn-danger');

            enableControl('#buttonRestart');
            disableControl('#keypad');
            $(".keypad-btn-width").attr('disabled', true);
        };

		function onTimer() {
			console.log('working: ' + timerPosition);
			updateTime(timerPosition);

			if(timerPosition-1 >= -1){
				timerPosition--;
			}else{
				stopTimer();
				updateTime(timerPosition);
			}
		};

        function updateTimeValues(hours, minutes, seconds){
            $('#hoursValue').text(NormalizeNumbers(hours));
            $('#minutesValue').text(NormalizeNumbers(minutes));
            $('#secondsValue').text(NormalizeNumbers(seconds));
        };

        function NormalizeNumbers(number){
            var result = number.toString();
            while(result.length < 2){
                result = '0' + result;
            }
            return result;
        }

		function updateTime(seconds){
            if(seconds < 60){
                updateTimeValues(0,0,seconds);
                return;
            }

            var minutes = seconds / 60;
            var hours = 0;
            if(minutes > 0){
                seconds = seconds % 60;
                minutes = Math.floor(minutes);
				hours = minutes / 60;
                if(hours > 0){
                    hours = Math.floor(hours);
                    minutes = minutes % 60;
					
                    if(hours > 99){
                        hours = 99;
                    }
                }
            }

            updateTimeValues(hours,minutes,seconds);
		};

        $('#buttonStartStop').on('touchend', function(){
            if(!angular.isDefined(timer)){
                startTimer();
                return;
            }

            stopTimer();
        });
		
		$('#buttonRestart').on('touchend', function(){
            ResetScreen();
		});

        $('#buttonSkip').on('touchend',function(){
            timerInitialValue = 0;
            ResetScreen();
            //todo navigate back
        });

        function ResetScreen(){
            if(angular.isDefined(timer)){
                stopTimer();
            }
            $scope.keyboardValue = '';
            updateTimeValues(0,0,0);
        };

		var element;
		$('a').click(function() {
			element = this;  // 'this' is a reference to the element that triggered the click
			$scope.keyboardValue = '';
		});
		
		function updateKeyboardValue(){
			$(element).text($scope.keyboardValue);
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
						if($scope.keyboardValue.length == 0){
                            $scope.keyboardValue = '00';
                        }
                        var result = $scope.keyboardValue.concat(key.toString());
						while(result.length > 2){
                            result = result.substring(1,result.length);
                        }
                        $scope.keyboardValue = result;
						break;
					case "DEL":
						var result = $scope.keyboardValue.substring(0,$scope.keyboardValue.length-1);
						if(result.length < 2){
                            result = "00";
                        }
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

            updateKeyboardValue();
		}

		this.keyPressed = function(key) {
			keyPressedF(key);
		}
	}]);
	app.directive('numericKeyboard' ,function(){
		return {
			restrict: 'E',
			templateUrl: 'numerickeyboard.html',
			controller: function(){
				
			},
			controllerAs: 'controller'
		};
	});
})();