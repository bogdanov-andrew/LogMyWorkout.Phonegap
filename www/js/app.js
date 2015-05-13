(function(){ 
	var app = angular.module('startPage', [ 'dataAccessModule' ]);
	app.controller('StartPageController', function($scope, dataAccess){

		if( window.cordova ) {
			document.addEventListener( 'deviceready', start, false );
		} else {
			$( start );
		}

		function start() {
			// ����� ���������� JS-������ ������ ����������
			//dataAccess.initDb();
			//dataAccess.createScheme();

			/*var db = window.openDatabase("TestDB","1.0", "Demo", -1);

			db.transaction(function(tx) {
				tx.executeSql('DROP TABLE IF EXISTS test_table');
				tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
			});

			db.transaction(function(tx) {
				tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
					console.log("insertId: " + res.insertId + " -- probably 1");
					console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
				});
			});

			db.transaction(function(tx) {
				tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
					console.log("res.rows.length: " + res.rows.length + " -- should be 1");
					console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
				});
			});*/
		}

		this.trainData = exerciseList;
		$('#myButton').on('click', function () {
			window.location.href = "exercises.html";
		  });
	});
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
})();