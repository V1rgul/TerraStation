
console.log("read scripts");

//*
var app = angular.module("TerraStation", ['ngAnimate','chart.js','niceTime'])

.controller("TerraStationMain", ['$scope', function($scope){

	$scope.settings = {
		rain: [
			{ time: { h:10, m:0 }, duration:{ m:5 } },
			{ time: { h:19, m:0 }, duration:{ m:5 } },
		],
		light : {
			start:{h:10,m:0},
			end:{h:10,m:0}
		}
	};


	$scope.deleteIndex = function(array, id){
		array.splice(id, 1);
	};
	$scope.add = function(arr){
		arr.push({});
	};



	$scope.graph.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.graph.series = ['Series A', 'Series B'];
	$scope.graph.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.graph.onClick = function (points, evt) {
		console.log(points, evt);
	};
}]);