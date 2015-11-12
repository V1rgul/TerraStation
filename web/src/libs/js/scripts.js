

var app = angular.module("TerraStation", ['ngAnimate'])

.controller("TerraStationMain", ['$scope', function($scope){

	$scope.settings = {
		rain: [
			{ time:"10:00:00", duration:"5:00" },
			{ time:"19:00:00", duration:"5:00" }
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