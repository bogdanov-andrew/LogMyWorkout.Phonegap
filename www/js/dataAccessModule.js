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
                //tx.executeSql('DROP TABLE IF EXISTS ExerciseGroup');
                tx.executeSql('CREATE TABLE IF NOT EXISTS ExerciseGroup (exerciseGroupId integer primary key, exerciseId integer, trainingId blob, groupId integer, foreign key(trainingId) references Training(trainingId), foreign key(exerciseId) references Exercise(exerciseId))');
            });
            db.transaction(function (tx) {
                //tx.executeSql('DROP TABLE IF EXISTS Sets');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Sets (setId integer primary key, exerciseGroupId integer, value real, repetitions integer, foreign key(exerciseGroupId) references ExerciseGroup(exerciseGroupId))');
            });
        },
        initExerciseTypes: function(){
            db.transaction(function(tx){
                console.log('initTables');
                tx.executeSql("INSERT INTO ExerciseType (exerciseTypeId, name, unit) VALUES (?,?,?)", [1,"Repetitions", "rep"]);
                tx.executeSql("INSERT INTO ExerciseType (exerciseTypeId, name, unit) VALUES (?,?,?)", [2,"Weight + Repetitions", "kg * rep"]);
            });
        },
        recreateTables: function(){
            db.transaction(function(tx){
                tx.executeSql('DROP TABLE IF EXISTS Sets');
                console.log('Stes dropped');
                tx.executeSql('DROP TABLE IF EXISTS ExerciseGroup');
                console.log('ExerciseGroup dropped');
                tx.executeSql('DROP TABLE IF EXISTS Training');
                console.log('Training dropped');
                tx.executeSql('DROP TABLE IF EXISTS Exercise');
                console.log('Exercise dropped');
                tx.executeSql('DROP TABLE IF EXISTS ExerciseType');
                console.log('ExerciseType dropped');
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
        getDoneRepetitions: function(exerciseGroupId, callback){
            
            db.transaction(function(tx){
                    tx.executeSql("select * from Sets where exerciseGroupId=?", [exerciseGroupId], function(tx, res) {
                            var results = [];
                            var len = res.rows.length;
                            if(len > 0){
                                for(i = 0; i < len; i++){
                                    var element = {
                                        id: res.rows.item(i)['setId'],
                                        exerciseId: res.rows.item(i)['exerciseGroupId'],
                                        weight: res.rows.item(i)['value'],
                                        repetitions: res.rows.item(i)['repetitions']
                                    }
                                    console.log(element.name);
                                    results.push(element);
                                }
                            }
                            callback(results);
                        });
            });
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
                tx.executeSql("INSERT INTO Sets (exerciseGroupId, value, repetitions) VALUES (?,?,?)", [data.exerciseGroupId, data.value, data.repetitions]);
            });
        }
    })
    .run(function(){
        db = window.openDatabase("LogMyWorkoutDB", "1.0", "Demo", -1);
    })
