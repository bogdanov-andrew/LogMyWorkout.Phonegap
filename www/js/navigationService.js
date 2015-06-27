var module = angular.module('navigationModule',[ ]);

module.factory('navigationService', [ '$location', function($location){

    var historyList = [];

    this.navigateBack = function(){
        var backPage = historyList.pop();
        $location.path(backPage);
    };

    this.navigateToExercises = function(){
        historyList.push($location.path());
        $location.path('/exercises');
    };

    return{
        navigateToExercises: this.navigateToExercises,
        navigateBack: this.navigateBack
    };
}]);
