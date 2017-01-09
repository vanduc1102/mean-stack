app.controller('AppController',function($scope,UrlService,$window, $location, $rootScope){
	$rootScope.$on('$routeChangeStart', function (event) {
        if (!$rootScope.isAuthenticated) {
            event.preventDefault();
            $location.path('/login');
        }
    });
});