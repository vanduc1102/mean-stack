app.controller('AppController',function($scope,UrlService,$window, $location, $rootScope){
	if(!$rootScope.isAuthenticated){
		$location.path('/login');
	}
});