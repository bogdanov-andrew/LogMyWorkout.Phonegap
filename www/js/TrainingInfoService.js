var module = angular.module('trainingInfoModule',[ ]);

function TrainingService(){
   var trainingId = 0;
   var exerciseId = 0;
   function getTrainingId (){
       console.log('getTrainingId:' + trainingId);
       return trainingId;
   };

   function setTrainingId(id){
       console.log('setTrainingId:' + id);
       trainingId = id;
   };

   function getExerciseId (){
       return exerciseId;
   };

   function setExerciseId (id){
       exerciseId = id;
   };

    return{
        getTrainingId: getTrainingId,
        setTrainingId: setTrainingId
    };
};

module.service('trainingInfoService',TrainingService);
