var app = angular.module('workoutPage',[ 'dataAccessModule', 'trainingInfoModule', 'navigationModule' ]);
app.controller('WorkoutPageController', function($scope, $location, dataAccess, trainingInfoService, navigationService){
    $scope.exercises = [];
    $scope.exerciseListLoaded = function(data){
        console.log(data.length);
        $scope.$apply(function(){
            $scope.exercises = data;
        });
    };

    $scope.loadExercises = function(){
        dataAccess.getTrainData(trainingInfoService.getTrainingId(), this.exerciseListLoaded);
    };

    $scope.loadExercises();
    trainingInfoService.setExerciseGroupId(0);
    console.log(trainingInfoService.getTrainingId());

    $scope.continueSaving = function(){
        //$scope.$apply(function(){
            navigationService.navigateToLogResults();            
        //});
    };

    $scope.getExerciseGroupId = function(id){
        trainingInfoService.setExerciseGroupId(id);
        $scope.continueSaving();
    };

    $scope.doAnotherExercise = function(){
        navigationService.navigateToExercises();
    };

    $scope.doExercise = function(exGroup){
        trainingInfoService.setExerciseId(exGroup.exercises[0].exerciseId);

        var groupId = 0;
        if(exGroup.exerciseGroupId){
            groupId = exGroup.exerciseGroupId;
            trainingInfoService.setExerciseGroupId(groupId);
        }else{
            groupId = trainingInfoService.getExerciseGroupId();
        }

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
