app.controller('ShortenUrlController',function($scope,UrlService,$window){
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
	$scope.isAuthenticated = false;
	$scope.shortedBase = $window.location.origin + '/shortener/';
	reloadList ();

	function reloadList (){
		UrlService.search().then(function(list){
			$scope.list = list;
		});
	}

	$scope.onDelete = function(item){
		UrlService.deleteUrl(item['_id']).then(function(){
			reloadList ();
		});
	}

});