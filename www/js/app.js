(function(){ 
	var app = angular.module('startPage', ['ngRoute', 'ngTouch', 'exercisePage', 'logResultsPage', 'dataAccessModule', 'trainingInfoModule', 'TimerPage', 'navigationModule' ]);
	app.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider.
                when('/', {
                    templateUrl: 'view/startPage.html',
                    controller: 'StartPageController'
                }).
                when('/exercises', {
					templateUrl: 'view/exercises.html',
					controller: 'ExercisePageController'
				}).
                when('/logresults', {
                    templateUrl: 'view/logresults.html',
                    controller: 'LogResultsPageController'
                }).
                when('/timer', {
                    templateUrl: 'view/timerPage.html',
                    controller: 'TimerPageController'
                }).
				otherwise({
					redirectTo: '/'
				});
				
		//$locationProvider.html5Mode(true);
		
		}]);
	app.controller('StartPageController', function($scope, $location, $rootScope, dataAccess, trainingInfoService, navigationService){

		$scope.trainData = {};

        if( window.cordova ) {
			document.addEventListener( 'deviceready', start, false );
		} else {
			$( start );
		}

		function start() {
			//dataAccess.initDb();
			//dataAccess.recreateTables();
			dataAccess.createScheme();
		};

        $scope.backAction = function() {
            navigationService.navigateBack();	
        };

        $scope.exerciseInformationLoaded = function(data){
			$scope.$apply(function(){
				$scope.trainData = data;
			});
		};

        $scope.lastTrainingIdLoaded = function(trainingId){
            dataAccess.getTrainData(trainingId, $scope.exerciseInformationLoaded);
        };

		dataAccess.getLastTrainingId($scope.lastTrainingIdLoaded);

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };

		$('#myButton').on('click', function () {
			trainingInfo = {
                id: guid(),
                startTime: new Date(),
                endTime: new Date()
            }

            dataAccess.startTraining(trainingInfo);
            trainingInfoService.setTrainingId(trainingInfo.id);
            $scope.$apply(function(){
            	navigationService.navigateToExercises();	
            });
		  });

	});


})();