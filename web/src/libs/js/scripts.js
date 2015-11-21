
console.log("read scripts");

//*
var app = angular.module("TerraStation", ['ngAnimate','niceTime'])

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

}]);

//*/