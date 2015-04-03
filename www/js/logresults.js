(function(){ 
	var app = angular.module('logResultsPage',[ ]);
	app.controller('LogResultsPageController', ['$interval' ,function($interval){
		this.repetitionList = repetitionList;
		
		$('#addExerciseRepetitionModal').on('shown.bs.modal', function(){
			$('#repetition-weight').focus();
		});	 
		
		this.startTimer = function() {
			window.location.href = "timerPage.html";
		};
		
		this.logRepetition = function(){
			var weight = $('#repetition-weight').val();
			var count = $('#repetition-count').val();
			var newRepetition = {
				id: 5,
				exerciseId: 1,
				weight: weight,
				repetitions: count
			};
			this.repetitionList.push(newRepetition);
			$("#addExerciseRepetitionModal").modal("hide");
		};
	}]);
	var repetitionList = 
		 [
			{
				id: 1,
				exerciseId: 1,
				weight: 50,
				repetitions: 10,
			},
			{
				id: 2,
				exerciseId: 1,
				weight: 52,
				repetitions: 15,
			},
			{
				id: 3,
				exerciseId: 1,
				weight: 53,
				repetitions: 9,
			},
			{
				id: 4,
				exerciseId: 1,
				weight: 55,
				repetitions: 7,
			},
			{
				id: 4,
				exerciseId: 1,
				weight: 55,
				repetitions: 7,
			}
		];
})();