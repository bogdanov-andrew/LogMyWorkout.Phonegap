var app = angular.module('exercisePage',[ 'dataAccessModule', 'trainingInfoModule' ]);
app.controller('ExercisePageController', function($scope, dataAccess, trainingInfoService){
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
    //trainingInfoService.setTrainingId(555);
    //console.log(trainingInfoService.getTrainingId());
    $('#myButton').on('click', function () {
        window.location.href = "exercises.html";
      });
    $('#addExerciseModal').on('shown.bs.modal', function(){
        $('#exercise-name').focus();
    });
    $scope.doExercise = function(number){
        window.location.href = "logresults.html";
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
