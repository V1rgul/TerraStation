

angular.module("myPolyfills", [])

//*
.directive('inputTime', function($compile){
	var defaults = {
		restrict: 'E',
		scope: {
			ngModel: '='
		},
	};

	if(Modernizr.inputtypes.time){
		return angular.extend(defaults, {
			template: '<input type="time" ng-Model="ngModel" />'
		});
	}

	return angular.extend(defaults, {
		template: function(){
			var r = [];
			//r.push('{{ngModel}}');
			r.push('<div class="myPolyfills-timeinput">');			
				r.push('<select ng-model="h">');
					for(var h=0; h<24; h++){
						r.push('<option value="'+h+'">'+h+'</option>');
					}
				r.push('</select>');
				r.push(':');
				r.push('<select ng-model="m">');
					for(var m=0; m<60; m++){
						r.push('<option value="'+m+'">'+m+'</option>');
					}
				r.push('</select>');
			r.push('</div>');
			return r.join('');
		},

		link: function ($scope, element) {
			// element will be the div which gets the ng-model on the original directive
			// var model = element.attr('ng-model');
			// $('input',element).attr('ng-model', model);

			$scope.$watch('ngModel', function(newValue){
				//console.log("updating model -> date");
				try{
					$scope.date = new Date(newValue);
				}catch(e){
					$scope.date = new Date(0);
					console.log("invalid date, changed to", $scope.date);
				}
				//console.log("date", $scope.date);			
			});
			$scope.$watch('date', function(newValue){
				//console.log("updating date -> model");
				$scope.ngModel = newValue.toISOString();
				$scope.h = ""+newValue.getHours();
				$scope.m = ""+newValue.getMinutes();
				//console.log("h", $scope.h, "m", $scope.m);
			}, true);
			$scope.$watch('h', function(newValue){
				//console.log("updating h", newValue);
				$scope.date.setHours(parseInt(newValue));				
				//console.log("date", $scope.date);
			});
			$scope.$watch('m', function(newValue){
				//console.log("updating m", newValue);
				$scope.date.setMinutes(parseInt(newValue));
				//console.log("date", $scope.date);
			});

			//return $compile(element)($scope);
		}
	});
});

//*/