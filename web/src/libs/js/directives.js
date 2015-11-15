

angular.module("niceTime", ["myPolyfills"]).directive("niceTime", function(){

	return {
		restrict: 'E',
		scope: {
			ngModel: '='
		},
		template: '<input-time ng-model="date"></input-time>',

		link: function ($scope, element) {

			$scope.$watch('ngModel', function(newValue){
				//console.log("updating model -> dateISO");
				var d = new Date(0);
				if(newValue.h) d.setHours(newValue.h);
				if(newValue.m) d.setMinutes(newValue.m);

				$scope.date = d.toISOString();				
				//console.log("date", $scope.date);				
			});
			$scope.$watch('date', function(newValue){
				//console.log("updating ISOdate -> model");
				var d = new Date(newValue);

				$scope.ngModel.h = d.getHours();
				$scope.ngModel.m = d.getMinutes();
			});

		}
	};



});