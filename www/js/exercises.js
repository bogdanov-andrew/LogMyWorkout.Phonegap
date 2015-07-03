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
    console.log(trainingInfoService.getTrainingId());

    $('#myButton').on('click', function () {
        navigationService.navigateToExercises();
      });
    $('#addExerciseModal').on('shown.bs.modal', function(){
        $('#exercise-name').focus();
    });
    $scope.doExercise = function(number){
        trainingInfoService.setExerciseId(number);
        navigationService.navigateToLogResults();
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
