(function(){ 
	var app = angular.module('exercisePage',[ ]);
	app.controller('ExercisePageController', function(){
		this.trainData = exerciseList;
		$('#myButton').on('click', function () {
			window.location.href = "exercises.html";
		  });
		$('#addExerciseModal').on('shown.bs.modal', function(){
			$('#exercise-name').focus();
		});	 
		this.doExercise = function(number){
			window.location.href = "logresults.html";
		};
		this.saveExercise = function(){
			var form = this.addExerciseForm;
			var nameVal = $('#exercise-name').val();
			var descriptionVal =  $('#description-text').val();
			var newExercise = {
				description: descriptionVal,
				name: nameVal,
				number: 0
			};
			this.trainData.push(newExercise);
			$("#addExerciseModal").modal("hide");
		}
	});
	var exerciseList = 
		 [
			{
				id: 1,
				name: 'Pop up',
				description: '10-12-13'
			},
			{
				id: 2,
				name: 'Push up',
				description: '10-12-13'
			}
		];
})();