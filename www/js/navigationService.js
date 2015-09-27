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

    this.navigateToWorkout = function(){
        historyList.push($location.url());
        changeLocation('/workout');
    };

    this.navigateToExercises = function(){
        historyList.push($location.url());
        changeLocation('/exercises');
    };

    this.navigateToLogResults = function(){
        historyList.push($location.url());
        changeLocation('/logresults');
    };

    this.navigateToHistory = function(){
        historyList.push($location.url());
        changeLocation('/history');
    };

    this.navigateToTimer = function(){
        historyList.push($location.url());
        changeLocation('/timer');
    };

    return{
        navigateToLogResults: this.navigateToLogResults,
        navigateToExercises: this.navigateToExercises,
        navigateToWorkout: this.navigateToWorkout,
        navigateToHistory: this.navigateToHistory,
        navigateToTimer: this.navigateToTimer,
        navigateBack: this.navigateBack
    };
}]);
