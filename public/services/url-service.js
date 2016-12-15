app.service('UrlService',function($http, $q){
	return {
		create: function(originUrl){
			var defer = $q.defer();
			$http({
				url:'./shortener',
				data:originUrl,
				method:'POST'
			}).then(function(response){
				defer.resolve(response['data']);
			},function(reason){
				defer.reject(reason);
			});
			return defer.promise;
		},
		search: function(){
			var defer = $q.defer();
			$http({
				url:'./shortener',
				method:'GET'
			}).then(function(response){
				defer.resolve(response['data']);
			},function(reason){
				defer.reject(reason);
			});
			return defer.promise;
		},
		find: function( urlId){
			var defer = $q.defer();
			$http({
				url:'./shortener/'+urlId,
				method:'GET'
			}).then(function(response){
				defer.resolve(response['data']);
			},function(reason){
				defer.reject(reason);
			});
			return defer.promise;
		},
		deleteUrl: function( urlId){
			var defer = $q.defer();
			$http({
				url:'./shortener/'+urlId,
				method:'DELETE'
			}).then(function(response){
				defer.resolve(response);
			},function(reason){
				defer.reject(reason);
			});
			return defer.promise;
		}
	};
})