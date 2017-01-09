app.service('UserService',function($http, $q){
	return {
		create: function(user){
			var defer = $q.defer();
			$http({
				url:'./user',
				data:user,
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
				url:'./user',
				method:'GET'
			}).then(function(response){
				defer.resolve(response['data']);
			},function(reason){
				defer.reject(reason);
			});
			return defer.promise;
		},
		find: function(userId){
			var defer = $q.defer();
			$http({
				url:'./user/'+userId,
				method:'GET'
			}).then(function(response){
				defer.resolve(response['data']);
			},function(reason){
				defer.reject(reason);
			});
			return defer.promise;
		},
		signin:function(data){
			var defer = $q.defer();
			$http({
				url:'./signin',
				method:'POST',
				data: data
			}).then(function(response){
				defer.resolve(response['data']);
			},function(reason){
				defer.reject(reason);
			});
			return defer.promise;
		}
	};
})