(function(){ 
	var app = angular.module('masterPage', ['ngRoute', 'ngTouch', 'exercisePage', 'logResultsPage', 'dataAccessModule', 'trainingInfoModule', 'TimerPage', 'navigationModule', 'startPage', 'historyPage' ]);
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
				when('/history', {
					templateUrl: 'view/historyPage.html',
					controller: 'HistoryPageController'
				}).
				otherwise({
					redirectTo: '/'
				});
				
		//$locationProvider.html5Mode(true);
		
		}]);
	app.controller('MasterPageController', function($scope, dataAccess, navigationService){

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

		$scope.historyRequest = function(){
			navigationService.navigateToHistory();
		};

        $scope.backAction = function() {
            navigationService.navigateBack();	
        };
	});
})();