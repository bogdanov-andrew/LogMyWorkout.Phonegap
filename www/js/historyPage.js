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

    $scope.loadHistory();
});
