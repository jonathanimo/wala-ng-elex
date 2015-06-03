elexApp.factory('RacesFactory', ['$http', function($http){
var r = {
	races:[]
}	
	r.getRaces = function(id){
		return $http.get('/elections/' + id).then(function(req){
			return r.races = req.data;
		});
	}
	r.putRaces = function(id,race){
		return $http.post('/elections/' + id + '/race', race)
	};
	r.putCandidates = function(race,candidates){
		return $http.post('/elections/' + id + '/race/' + race + '/candidate', candidates)
	};
	return r;
}]);