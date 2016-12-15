app.controller('AppController',function($scope,UrlService,$window){
	$scope.onSubmit = function($event){
		if(!$scope.myForm.$invalid){
			var data = {
				originUrl : $scope.originUrl
			};
			UrlService.create(data).then(function(response){
				$scope.shortenedUrl = $scope.shortedBase + response.shortened;
				reloadList ();
			});
		}
	}

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