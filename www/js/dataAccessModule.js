angular.module('dataAccessModule',[ ])
    .value('dataAccess', {
        db: null,
        initDb: function () {
            console.log('Init!');
            db = window.openDatabase("LogMyWorkoutDB", "1.0", "Demo", -1);
        },
        createScheme: function () {
            db.transaction(function (tx) {
                    tx.executeSql('DROP TABLE IF EXISTS ExerciseType');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS ExerciseType (exerciseTypeId integer primary key, name text, unit text)');
                });
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS ExerciseDescription (exerciseDescriptionId integer primary key, name text, exerciseTypeId integer, foreign key(exerciseTypeId) references ExerciseType(exerciseTypeId))');
            });
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Training (trainingId integer primary key, startTime text, endTime text)');
            });
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Exercise (exerciseId integer primary key, trainingId integer, exerciseDescriptionId integer, foreign key(trainingId) references Training(trainingId), foreign key(exerciseDescriptionId) references ExerciseDescription(exerciseDescriptionId))');
            });
            db.transaction(function (tx) {
                tx.executeSql('DROP TABLE IF EXISTS Sets');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Sets (setId integer primary key, exerciseId integer, value real, repetitions integer, foreign key(exerciseId) references Exercise(exerciseId))');
            });
        },
        initTables: function() {
            db.transaction(function (tx) {
                console.log('initTables');
                tx.executeSql("INSERT INTO ExerciseType (exerciseTypeId, name, unit) VALUES (?,?,?)", [1,"Repetitions", "rep"]);
                tx.executeSql("INSERT INTO ExerciseType (exerciseTypeId, name, unit) VALUES (?,?,?)", [2,"Weight + Repetitions", "kg * rep"]);
            });
        },
        addExercise: function(exercise){
            db.transaction(function (tx) {
                tx.executeSql("INSERT INTO ExerciseDescription (name, exerciseTypeId) VALUES (?,?)", [exercise.name, exercise.type]);
            });
        },
        getExercises: function(callback){
            db.transaction(function (tx) {
                tx.executeSql("select * from ExerciseDescription", [], function(tx, res) {
                    var results = [];
                    var len = res.rows.length;
                    if(len > 0){
                        for(i = 0; i < len; i++){
                            var element = {
                                id: res.rows.item(i)['exerciseDescriptionId'],
                                name: res.rows.item(i)['name'],
                                type: res.rows.item(i)['exerciseTypeId'],
                                description: ''
                            }
                            console.log(element.name);
                            results.push(element);
                        }
                    }
                    callback(results);
                });
            });
        }
    })
    .run(function(){
        db = window.openDatabase("LogMyWorkoutDB", "1.0", "Demo", -1);
    })
