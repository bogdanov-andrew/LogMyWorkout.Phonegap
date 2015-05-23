var module = angular.module('trainingInfoModule',[ ]);

function TrainingService(){
   this.trainingId = 0;
   this.exerciseId = 0;
   this.getTrainingId = function(){
       console.log('getTrainingId:' + this.trainingId);
       return this.trainingId;
   };

   this.setTrainingId = function (id){
       console.log('setTrainingId:' + id);
       this.trainingId = id;
   };

   function getExerciseId (){
       return exerciseId;
   };

   function setExerciseId (id){
       exerciseId = id;
   };

    return{
        trainingId: this.trainingId,
        getTrainingId: this.getTrainingId,
        setTrainingId: this.setTrainingId
    };
};

//module.factory('trainingInfoService',TrainingService);
module.provider('trainingInfoService',function(){
    var trainingId = 0;
    function getTrainingId (){
        console.log('getTrainingId:' + trainingId);
        return trainingId;
    };

    function setTrainingId(id){
        console.log('setTrainingId:' + id);
        trainingId = id;
    };

    this.$get = function() {
        return {
            getTrainingId: getTrainingId,
            setTrainingId: setTrainingId
        }
    }

});
