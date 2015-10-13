var app = angular.module('startPage', ['ngRoute', 'ngTouch', 'exercisePage', 'logResultsPage', 'dataAccessModule', 'trainingInfoModule', 'TimerPage', 'navigationModule' ]);
app.controller('StartPageController', function($scope, $location, $rootScope, dataAccess, trainingInfoService, navigationService){

    $scope.trainData = {};

    $scope.exerciseInformationLoaded = function(data){
        $scope.$apply(function(){
            $scope.trainData = data;
        });
    };

    $scope.lastTrainingIdLoaded = function(trainingId){
        dataAccess.getTrainData(trainingId, $scope.exerciseInformationLoaded);
    };

    $scope.formatSets = function(sets){
        var result = sets.reduce(function(str, currentSet) {  
            if(currentSet.value){
                return str + currentSet.value + 'x' +currentSet.repetitions + ','; 
            }else{
                return str + currentSet.repetitions + ','; 
            }
            
        }, 0);
        result = result.slice(0,result.length-1);
        return result;
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
            navigationService.navigateToWorkout();
        });
    });
});
