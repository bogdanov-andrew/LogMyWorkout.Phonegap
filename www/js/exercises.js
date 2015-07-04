var app = angular.module('exercisePage',[ 'dataAccessModule', 'trainingInfoModule', 'navigationModule' ]);
app.controller('ExercisePageController', function($scope, $location, dataAccess, trainingInfoService, navigationService){
    $scope.exercises = [];
    $scope.exerciseListLoaded = function(data){
        console.log(data.length);
        $scope.$apply(function(){
            $scope.exercises = data;
        });
    };

    $scope.loadExercises = function(){
        dataAccess.getExercises(this.exerciseListLoaded);
    };

    $scope.loadExercises();
    trainingInfoService.setExerciseGroupId(0);
    console.log(trainingInfoService.getTrainingId());

    $('#myButton').on('click', function () {
        navigationService.navigateToExercises();
      });
    $('#addExerciseModal').on('shown.bs.modal', function(){
        $('#exercise-name').focus();
    });

    $scope.continueSaving = function(){
        $scope.$apply(function(){
            navigationService.navigateToLogResults();            
        });
    };

    $scope.getExerciseGroupId = function(id){
        trainingInfoService.setExerciseGroupId(id);
        $scope.continueSaving();
    };

    $scope.doExercise = function(number){
        trainingInfoService.setExerciseId(number);
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
    $scope.saveExercise = function(){
        var form = this.addExerciseForm;
        var nameVal = $('#exercise-name').val();
        var descriptionVal =  $('#description-text').val();
        var newExercise = {
            description: descriptionVal,
            name: nameVal,
            number: 0,
            type: 1
        };
        dataAccess.addExercise(newExercise);
        $scope.loadExercises();
        $("#addExerciseModal").modal("hide");
    }
});
