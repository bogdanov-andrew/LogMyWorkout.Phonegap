(function(){ 
	var app = angular.module('startPage', ['ngRoute', 'ngTouch', 'exercisePage', 'logResultsPage', 'dataAccessModule', 'trainingInfoModule', 'TimerPage' ]);
	app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
                when('/', {
                    templateUrl: 'startPage.html',
                    controller: 'StartPageController'
                }).
                when('/exercises', {
					templateUrl: 'exercises.html',
					controller: 'ExercisePageController'
				}).
                when('/logresults', {
                    templateUrl: 'logresults.html',
                    controller: 'LogResultsPageController'
                }).
                when('/timer', {
                    templateUrl: 'timerPage.html',
                    controller: 'TimerPageController'
                }).
				otherwise({
					redirectTo: '/'
				});
		}]);
	app.controller('StartPageController', function($scope, $location, dataAccess, trainingInfoService){

		$scope.trainData = {};

		if( window.cordova ) {
			document.addEventListener( 'deviceready', start, false );
		} else {
			$( start );
		}

		function start() {
			//dataAccess.initDb();
			dataAccess.recreateTables();
			dataAccess.createScheme();
		}

		this.exerciseInformationLoaded = function(data){
			console.log(data.exercises.length);
			console.log(data.lastTrain);
			$scope.trainData = data;
		};

		dataAccess.getLastTrainInformation(this.exerciseInformationLoaded);

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

		$('#myButton').on('click', function () {
			trainingInfo = {
                id: guid(),
                startTime: new Date(),
                endTime: new Date()
            }

            dataAccess.startTraining(trainingInfo);
            trainingInfoService.setTrainingId(trainingInfo.id);

            $location.path('/exercises');
            $scope.$apply();
		  });

	});


})();