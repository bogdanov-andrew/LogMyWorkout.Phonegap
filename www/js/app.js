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
			dataAccess.createScheme();
			//dataAccess.initTables();
		}

		this.exerciseInformationLoaded = function(data){
			console.log(data.exercises.length);
			console.log(data.lastTrain);
			$scope.trainData = data;
		};

		dataAccess.getLastTrainInformation(this.exerciseInformationLoaded);

		$('#myButton').on('click', function () {
			trainingInfoService.setTrainingId(123);
			$location.path('/exercises');
            $scope.$apply();
		  });
	});


})();