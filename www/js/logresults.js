var app = angular.module('logResultsPage',[ 'dataAccessModule' ]);
app.controller('LogResultsPageController', function($interval, $scope, dataAccess){
	$scope.repetitionList = [];

    $scope.repetitionsLoaded = function(data){
        console.log(data.length);
        $scope.repetitionList = data;
    };

    $scope.loadRepeptitions = function(){
        dataAccess.getDoneRepetitions($scope.repetitionsLoaded);
    }

    $scope.loadRepeptitions();

	$('#addExerciseRepetitionModal').on('shown.bs.modal', function(){
		$('#repetition-weight').focus();
	});

	$scope.startTimer = function() {
		window.location.href = "timerPage.html";
	};

	$scope.logRepetition = function(){
		var weight = $('#repetition-weight').val();
		var count = $('#repetition-count').val();
		var newRepetition = {
			id: 5,
			exerciseId: 1,
			weight: weight,
			repetitions: count
		};
        dataAccess.saveDoneRepetitions(newRepetition);
		$scope.loadRepeptitions();
        //this.repetitionList.push(newRepetition);
		$("#addExerciseRepetitionModal").modal("hide");
	};
});
