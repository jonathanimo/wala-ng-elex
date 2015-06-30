elexApp.factory('ElectionFactory', ['Restangular', function(Restangular) {
	var e = {};
	e.getAll = function(){
		return Restangular.all('elections');
	}
	e.getOne = function(election){
		return Restangular.one('elections',election);
	}
		
	return e;
}]);