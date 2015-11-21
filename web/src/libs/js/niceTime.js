
//precalc some things ...
(function(){

var obj = {
	restrict: 'E',
	scope: {
		ngModel: '='
	},

	template: (function(){
		var r = [];
		//r.push('{{ngModel}}');
		r.push('<div class="niceTime">');			
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
	})(),
	link: function ($scope, element) {

		$scope.$watch('ngModel', function(newValue){
			$scope.h = ""+(newValue.h || 0);
			$scope.m = ""+(newValue.m || 0);
		}, true);
		$scope.$watch('h', function(newValue){
			$scope.ngModel.h = parseInt(newValue);
		});
		$scope.$watch('m', function(newValue){
			$scope.ngModel.m = parseInt(newValue);
		});

	},
};

angular.module("niceTime", []).directive("niceTime", function(){
	return obj;
});

})();