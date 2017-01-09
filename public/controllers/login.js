app.controller('LoginController',function($scope,UserService,$rootScope, $location){
	$scope.onLoginSubmit = function($event){
		$event.preventDefault();
		UserService.signin({
			username:$scope.username,
			password:$scope.password
		}).then(function(response){
			console.log(response);
			$location.path("/shorten-url");
			$rootScope.isAuthenticated=true;
		}, function(error){
			console.log(error);
		});
	}
});