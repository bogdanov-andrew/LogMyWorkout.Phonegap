(function(){ 
	var app = angular.module('startPage',[ ]);
	app.controller('StartPageController', function(){
		this.trainData = exerciseList;
		$('#myButton').on('click', function () {
			window.location.href = "exercises.html";
		  });
	});
	var exerciseList = {
		lastTrain: '2015-03-15',
		exercises: [
			{
				number: 1,
				name: 'Pop up',
				result: '10-12-13'
			},
			{
				number: 2,
				name: 'Push up',
				result: '10-12-13'
			},
			{
				number: 3,
				name: 'Hyperextensy',
				result: '10-12-13'
			},
			{
				number: 4,
				name: 'Push up',
				result: '10-12-13'
			}
		]
	};
})();