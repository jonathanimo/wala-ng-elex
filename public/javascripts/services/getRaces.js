elexApp.factory('RacesFactory', ['$http', function($http){
	var r = {
		races:[]
	};

	r.getRaces = function(id){
		return $http.get('/elections/' + id).success(function(data){
			angular.copy(data, r.races);
		});
	}

	return r;
}]);