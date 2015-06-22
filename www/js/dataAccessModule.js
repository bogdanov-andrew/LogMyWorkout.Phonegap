angular.module('dataAccessModule',[ ])
    .value('dataAccess', {
        db: null,
        initDb: function () {
            console.log('Init!');
            db = window.openDatabase("LogMyWorkoutDB", "1.0", "Demo", -1);
        },
        createScheme: function () {
            db.transaction(function (tx) {
                    //tx.executeSql('DROP TABLE IF EXISTS ExerciseType');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS ExerciseType (exerciseTypeId integer primary key, name text, unit text)');
                });
            db.transaction(function (tx) {
                //tx.executeSql('DROP TABLE IF EXISTS Exercise');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Exercise (exerciseId integer primary key, name text, exerciseTypeId integer, foreign key(exerciseTypeId) references ExerciseType(exerciseTypeId))');
            });
            db.transaction(function (tx) {
                //tx.executeSql('DROP TABLE IF EXISTS Training');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Training (trainingId blob primary key, startTime text, endTime text)');
            });
            db.transaction(function (tx) {
                tx.executeSql('DROP TABLE IF EXISTS ExerciseGroup');
                tx.executeSql('CREATE TABLE IF NOT EXISTS ExerciseGroup (exerciseGroupId integer primary key, exerciseId integer, trainingId blob, groupId integer, foreign key(trainingId) references Training(trainingId), foreign key(exerciseId) references Exercise(exerciseId))');
            });
            db.transaction(function (tx) {
                //tx.executeSql('DROP TABLE IF EXISTS Set');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Set (setId integer primary key, exerciseGroupId integer, value real, repetitions integer, foreign key(exerciseGroupId) references ExerciseGroup(exerciseGroupId))');
            });
        },
        initExerciseTypes: function(){
            db.transaction(function(tx){
                console.log('initTables');
                tx.executeSql("INSERT INTO ExerciseType (exerciseTypeId, name, unit) VALUES (?,?,?)", [1,"Repetitions", "rep"]);
                tx.executeSql("INSERT INTO ExerciseType (exerciseTypeId, name, unit) VALUES (?,?,?)", [2,"Weight + Repetitions", "kg * rep"]);
            });
        },
        getExerciseTypes: function(callback){
            db.transaction(function(tx){
                    tx.executeSql("select * from ExerciseType", [], function(tx, res) {
                        var results = [];
                        var len = res.rows.length;
                        if (len > 0) {
                            for (i = 0; i < len; i++) {
                                var element = {
                                    id: res.rows.item(i)['exerciseTypeId'],
                                    name: res.rows.item(i)['name']
                                }
                                results.push(element);
                            }
                        }
                        callback(results);
                    });
            });
        },
        startTraining: function(trainingInfo){
            db.transaction(function(tx){
                tx.executeSql("INSERT INTO Training (trainingId, startTime) VALUES (?,?)", [trainingInfo.id, trainingInfo.startTime.toISOString()]);
            });
        },
        endTraining: function(trainingInfo){
            db.transaction(function(tx){
                tx.executeSql("UPDATE Training SET endTime = ? WHERE trainingId = ?", [trainingInfo.endTime.toISOString(), trainingInfo.id]);
            });
        },
        addExercise: function(exercise){
            db.transaction(function (tx) {
                tx.executeSql("INSERT INTO Exercise (name, exerciseTypeId) VALUES (?,?)", [exercise.name, exercise.type]);
            });
        },
        getExercises: function(callback){
            db.transaction(function (tx) {
                tx.executeSql("select * from Exercise", [], function(tx, res) {
                    var results = [];
                    var len = res.rows.length;
                    if(len > 0){
                        for(i = 0; i < len; i++){
                            var element = {
                                id: res.rows.item(i)['exerciseId'],
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
        },
        getLastTrainInformation: function(callback){
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

            callback(exerciseList);
        },
        getDoneRepetitions: function(callback){
            var repetitionList =
                [
                    {
                        id: 1,
                        exerciseId: 1,
                        weight: 50,
                        repetitions: 10
                    },
                    {
                        id: 2,
                        exerciseId: 1,
                        weight: 52,
                        repetitions: 15
                    },
                    {
                        id: 3,
                        exerciseId: 1,
                        weight: 53,
                        repetitions: 9
                    },
                    {
                        id: 4,
                        exerciseId: 1,
                        weight: 55,
                        repetitions: 7
                    },
                    {
                        id: 4,
                        exerciseId: 1,
                        weight: 55,
                        repetitions: 7
                    }
                ];
            callback(repetitionList);
        },
        createExerciseGroup : function(data, callback){
            db.transaction(function(tx){
                tx.executeSql("INSERT INTO ExerciseGroup (exerciseId, trainingId, groupId) VALUES (?,?,?)", [data.exerciseId, data.trainingId, data.groupId], function(tx, res) {
                     console.log("insertId: " + res.insertId);
                     callback(res.insertId);   
                 });
            });    
        },
        saveDoneRepetitions: function(data){
            db.transaction(function(tx){
                tx.executeSql("INSERT INTO Set (exerciseGroupId, value, repetitions) VALUES (?,?,?)", [data.exerciseGroupId, data.value, data.repetitions]);
            });
        }
    })
    .run(function(){
        db = window.openDatabase("LogMyWorkoutDB", "1.0", "Demo", -1);
    })
