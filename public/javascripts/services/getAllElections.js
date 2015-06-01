elexApp.factory('ElectionFactory', ['$http', function($http) {
	var e = {
		elections:[]
	};


	e.getAll = function(){
		return $http.get('/elections').success(function(data){
			angular.copy(data, e.elections);
		})
	}
		return e;	
}]);