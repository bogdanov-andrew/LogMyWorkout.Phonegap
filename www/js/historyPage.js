var app = angular.module('historyPage',[ 'dataAccessModule', 'trainingInfoModule', 'navigationModule' ]);
app.controller('HistoryPageController', function($scope, $location, dataAccess, trainingInfoService, navigationService){
    $scope.history = [];
    $scope.historyListLoaded = function(data){
        console.log(data.length);
        $scope.$apply(function(){
            $scope.history = data;
        });
    };

    $scope.loadHistory = function(){
        dataAccess.getTrainHistoryData(this.historyListLoaded);
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

    $scope.loadHistory();
});
