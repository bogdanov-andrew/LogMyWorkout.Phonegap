var module = angular.module('trainingInfoModule',[ ]);

function TrainingService(){
   var trainingId = 0;
   var exerciseId = 0;
   var exerciseGroupId = 0;

   this.getTrainingId = function(){
       console.log('getTrainingId:' + trainingId);
       return trainingId;
   };

   this.setTrainingId = function (id){
       console.log('setTrainingId:' + id);
       trainingId = id;
   };

   this.getExerciseId = function(){
       return exerciseId;
   };

   this.setExerciseId = function(id){
       exerciseId = id;
   };

    this.getExerciseGroupId = function(){
        return exerciseGroupId;
    };

    this.setExerciseGroupId = function(id){
        exerciseGroupId = id;
    };

    return{    
        getTrainingId: this.getTrainingId,
        setTrainingId: this.setTrainingId,
        
        getExerciseId: this.getExerciseId,
        setExerciseId: this.setExerciseId,
        
        getExerciseGroupId: this.getExerciseGroupId,
        setExerciseGroupId: this.setExerciseGroupId
    };
};

module.factory('trainingInfoService',TrainingService);
