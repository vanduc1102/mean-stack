app.controller('AppController',function($scope,UrlService,$window){
	$scope.onSubmit = function($event){
		if(!$scope.myForm.$invalid){
			var data = {
				originUrl : $scope.originUrl
			};
			UrlService.create(data).then(function(response){
				$scope.shortenedUrl = $window.location.origin + '/shortener/' + response.shortened;
			});
		}
	}

	UrlService.search().then(function(list){
		console.log(list);
	});
});