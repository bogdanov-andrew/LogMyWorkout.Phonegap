var module = angular.module('navigationModule',[ ]);

module.factory('navigationService', [ '$location', function($location){

    var historyList = [];

    function changeLocation(location){
        $location.path(location);
    };

    this.navigateBack = function(){
        var backPage = historyList.pop();
        changeLocation(backPage);
    };

    this.navigateToExercises = function(){
        historyList.push($location.url());
        changeLocation('/exercises');
    };

    this.navigateToLogResults = function(){
        historyList.push($location.url());
        changeLocation('/logresults');
    };

    return{
        navigateToLogResults: this.navigateToLogResults,
        navigateToExercises: this.navigateToExercises,
        navigateBack: this.navigateBack
    };
}]);
