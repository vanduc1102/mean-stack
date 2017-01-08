app.controller('SignUpController',function($scope,UrlService,$window){
	$scope.onSubmit = function($event){
		if(!$scope.myForm.$invalid){
			var data = {
				originUrl : $scope.originUrl
			};
			if($scope.custom){
				data.custom = $scope.custom;
			}
			UrlService.create(data).then(function(response){
				$scope.shortenedUrl = $scope.shortedBase + response.shortened;
				$scope.custom = "";
				reloadList ();
			});
		}
	}

});