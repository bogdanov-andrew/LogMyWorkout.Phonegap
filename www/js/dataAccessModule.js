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
        getLastTrainingId: function(callback){
            var trainingId = 0;
            db.transaction(function(tx){
                tx.executeSql("select trainingId from Training where startTime=(select max(startTime) from Training)", [], function(tx, res) {
                    var len = res.rows.length;
                    if(len > 0){
                        trainingId = res.rows.item(0)['trainingId'];
                        console.log('getLastTrainingId: ' + trainingId);
                    }
                    callback(trainingId);
                });
            });
        },
        getTrainData: function(trainingId, callback){
            var sqlQuery = "select t.trainingId, t.startTime, eg.exerciseGroupId, ex.exerciseId, ex.name, s.setId, s.value, s.repetitions from Training t " +
                            "join ExerciseGroup eg on t.trainingId = eg.trainingId " +
                            "join Exercise ex on eg.exerciseId=ex.exerciseId " +
                            "join Sets s on eg.exerciseGroupId=s.exerciseGroupId " +
                            "where t.trainingId=?";
            db.transaction(function (tx) {
                tx.executeSql(sqlQuery, [trainingId], function(tx, res) {
                    var rawTrainData = [];
                    var resultTrainData = {};
                    var len = res.rows.length;
                    if(len > 0){
                        for(i = 0; i < len; i++){
                            var element = {
                                trainingId: res.rows.item(i)['trainingId'],
                                time: res.rows.item(i)['startTime'],
                                exerciseGroupId: res.rows.item(i)['exerciseGroupId'],
                                exerciseId: res.rows.item(i)['exerciseId'],
                                name: res.rows.item(i)['name'],
                                setId: res.rows.item(i)['setId'],
                                value: res.rows.item(i)['value'],
                                repetitions: res.rows.item(i)['repetitions']
                            };
                            console.log(element.trainingId);
                            rawTrainData.push(element);
                        }

                        var exerciseGroups = Enumerable.From(rawTrainData)
                            .GroupBy(function(x){ return x.exerciseGroupId; })
                            .Select(function(x, index){ return { 	exerciseGroupId:x.Key(),
                                number: index+1,
                                exercises: x.Where(function(y){ return x.exerciseGroupId = y.exerciseGroupId}).Distinct(function(x){ return x.exerciseId })
                                    .Select(function(y){
                                        return { 	exerciseId: y.exerciseId,
                                            name: y.name,
                                            sets: x.Where(function(z){ return y.exerciseId = z.exerciseId})
                                                .Select(function(z){
                                                    return { 	setId: z.setId,
                                                        value: z.value,
                                                        repetitions: z.repetitions}})
                                                .ToArray() };})
                                    .ToArray() } })
                            .ToArray();

                        resultTrainData.trainingId = rawTrainData[0].trainingId;
                        resultTrainData.time = rawTrainData[0].time;
                        resultTrainData.exerciseGroups = exerciseGroups;
                    }
                    callback(resultTrainData);
                });
            });
        },
        getTrainHistoryData: function(callback){
            var sqlQuery = "select t.trainingId, t.startTime, eg.exerciseGroupId, ex.exerciseId, ex.name, s.setId, s.value, s.repetitions from Training t " +
                "join ExerciseGroup eg on t.trainingId = eg.trainingId " +
                "join Exercise ex on eg.exerciseId=ex.exerciseId " +
                "join Sets s on eg.exerciseGroupId=s.exerciseGroupId " + 
                "order by t.startTime desc";
            db.transaction(function (tx) {
                tx.executeSql(sqlQuery, [],function(tx, res) {
                    var rawTrainData = [];
                    var len = res.rows.length;
                    var trainingsList = {};
                    if(len > 0){
                        for(i = 0; i < len; i++){
                            var element = {
                                trainingId: res.rows.item(i)['trainingId'],
                                time: res.rows.item(i)['startTime'],
                                exerciseGroupId: res.rows.item(i)['exerciseGroupId'],
                                exerciseId: res.rows.item(i)['exerciseId'],
                                name: res.rows.item(i)['name'],
                                setId: res.rows.item(i)['setId'],
                                value: res.rows.item(i)['value'],
                                repetitions: res.rows.item(i)['repetitions']
                            };
                            console.log(element.trainingId);
                            rawTrainData.push(element);
                        }

                        trainingsList = Enumerable.From(rawTrainData)
                            .GroupBy(function(x){return x.trainingId;})
                            .Select(function(x){ return {
                                trainingId: x.Key(),
                                time: x.ElementAt(0).time,
                                exerciseGroups: x.GroupBy(function(x){ return x.exerciseGroupId; })
                                    .Select(function(x, index){ return {
                                        exerciseGroupId:x.Key(),
                                        number: index+1,
                                        exercises: x.Where(function(y){ return x.exerciseGroupId = y.exerciseGroupId}).Distinct(function(x){ return x.exerciseId })
                                            .Select(function(y){
                                                return { 	exerciseId: y.exerciseId,
                                                    name: y.name,
                                                    sets: x.Where(function(z){ return y.exerciseId = z.exerciseId})
                                                        .Select(function(z){
                                                            return { 	setId: z.setId,
                                                                value: z.value,
                                                                repetitions: z.repetitions}})
                                                        .ToArray() };})
                                            .ToArray() } })
                                    .ToArray() };}).ToArray();
                        
                    }
                    callback(trainingsList);
                });
            });
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
                                    console.log(element.exerciseId);
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
