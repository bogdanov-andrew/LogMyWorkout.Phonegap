//(function(){
    angular.module('dataAccessModule',[ ])
        .value('dataAccess',{
            db: null,
            initDb: function(){
                console.log('Init!');
                db = window.openDatabase("LogMyWorkoutDB","1.0", "Demo", -1);
            },
            createScheme: function(){
                db.transaction(function(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS ExerciseType (exerciseTypeId integer primary key, name text, unit text)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS ExerciseDescription (exerciseDescriptionId integer primary key, name text, exerciseTypeId integer, foreign key(exerciseTypeId) references ExerciseType(exerciseTypeId))');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Training (trainingId integer primary key, startTime text, endTime text)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Exercise (exerciseId integer primary key, trainingId integer, exerciseDescriptionId integer, foreign key(trainingId) references Training(trainingId), foreign key(exerciseDescriptionId) references ExerciseDescription(exerciseDescriptionId))');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Set (setId integer primary key, exerciseId integer, value real, repetitions integer, foreign key(exerciseId) references Exercise(exerciseId))');
                });
            }
        })
//})();
