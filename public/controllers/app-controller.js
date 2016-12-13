app.controller('AppController',function($scope,UserService){
	$scope.user = {};
	$scope.onSubmit = function($event){
		UserService.create($scope.user);
	}
});