elexApp.factory('ElectionFactory', ['Restangular','$http','auth', function(Restangular,$http,auth) {
	var e = {};
	e.getAll = function(){
		return Restangular.all('elections', {Authorization: 'Bearer '+auth.getToken()});
	}
	e.getOne = function(election){
		return Restangular.one('elections',election);
	}
	e.getOneToEdit = function(election){
		return Restangular.one('elections',election,{Authorization: 'Bearer '+ auth.getToken()});
	}
		
	return e;
}]);