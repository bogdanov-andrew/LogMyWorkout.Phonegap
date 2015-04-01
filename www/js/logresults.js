(function(){ 
	var app = angular.module('logResultsPage',[ ]);
	app.controller('LogResultsPageController', function(){
		this.repetitionList = repetitionList;
		$('#myButton').on('click', function () {
			window.location.href = "exercises.html";
		  });
		$('#addExerciseRepetitionModal').on('shown.bs.modal', function(){
			$('#repetition-weight').focus();
		});	 
		this.doExercise = function(number){
		
		};
		
		function Timer(timeout){
			this.timeout = timeout;
			this.timerPosition = timeout;
			
			this.onTimer = function() {
				$('#timerButton').button('loading');	
				if(this.timerPostition-1 > 0){
					this.timerPostition--;
					$('#timerButton').button('Seconds left: ' + this.timerPostition);
				}else{
					clearInterval(this.timer);
					$('#timerButton').button('reset');	
				}
			};
		};
		
		this.timer = null;
		
		this.startTimer = function() {
			var newTimer = new Timer(15);
			this.timer = setInterval(
				function() 
				{ 
					newTimer.onTimer(); 
				}, 1000);
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
	});
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