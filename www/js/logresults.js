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
        //todo: load from service
        dataAccess.getDoneRepetitions(1, $scope.repetitionsLoaded);
    };

    $scope.loadRepeptitions();

	$('#addExerciseRepetitionModal').on('shown.bs.modal', function(){
		$('#repetition-weight').focus();
	});

	$scope.startTimer = function() {
        $location.path('/timer');
	};

	$scope.continueSaving = function(){
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
	}

	$scope.getExerciseGroupId = function(id){
		trainingInfoService.setExerciseGroupId(id);
		$scope.continueSaving();
	};

	$scope.logRepetition = function(){
		        
        var groupId = trainingInfoService.getExerciseGroupId();
		if(groupId == 0)
		{
			var newGroupData = {
				exerciseId: trainingInfoService.getExerciseId(),
				trainingId: trainingInfoService.getTrainingId(),
				groupId: 0
			};
			dataAccess.createExerciseGroup(newGroupData, $scope.getExerciseGroupId);
		}else{
			$scope.continueSaving();
		}
	};
});
