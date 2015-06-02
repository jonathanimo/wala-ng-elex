elexApp.factory('RacesFactory', ['$http', function($http){
var r = {
	races:[]
}	
	r.getRaces = function(id){
		return $http.get('/elections/' + id).then(function(req){
			return r.races = req.data;
		});
	}
	r.addRace = function(id,races){
		return $http.post('/elections/' + id + '/race/', races);
	}
	r.addCandidate = function(id,race,candidates){
		return $http.post('/elections/' + id + '/race/' + race + '/candidate', candidates);
	}
	return r;
}]);