(function(){ 
	var app = angular.module('startPage', [ 'dataAccessModule', 'trainingInfoModule' ]);
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
			//$location.url('/exercises.html');
			window.location.href = "exercises.html";
		  });
	});

})();