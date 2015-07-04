var app = angular.module('logResultsPage',[ 'dataAccessModule', 'trainingInfoModule', 'navigationModule' ]);
app.controller('LogResultsPageController', function($interval, $location, $scope, dataAccess, trainingInfoService, navigationService){
	$scope.repetitionList = [];

    $scope.repetitionsLoaded = function(data){
        console.log(data.length);
        $scope.$apply(function(){
            $scope.repetitionList = data;
        });
    };

    $scope.loadRepeptitions = function(){
        dataAccess.getDoneRepetitions(trainingInfoService.getExerciseGroupId(), $scope.repetitionsLoaded);
    };

    $scope.loadRepeptitions();

	$('#addExerciseRepetitionModal').on('shown.bs.modal', function(){
		$('#repetition-weight').focus();
	});

	$scope.startTimer = function() {
        $location.path('/timer');
	};

	$scope.logRepetition = function(){
        var weight = $('#repetition-weight').val();
        var count = $('#repetition-count').val();
        var newRepetition = {
            exerciseGroupId: trainingInfoService.getExerciseGroupId(),
            value: weight,
            repetitions: count
        };

        dataAccess.saveDoneRepetitions(newRepetition);
        $scope.loadRepeptitions();
        $("#addExerciseRepetitionModal").modal("hide");
	};
});
