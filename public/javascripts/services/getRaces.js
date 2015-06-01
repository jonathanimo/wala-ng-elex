elexApp.factory('ElectionFactory',['$http', function($http) {
var e = {
	elections:[]
};
return e;
e.getRaces = function() {
    return $http.get('/elections').success(function(data){
      angular.copy(data, e.elections);
      console.log(data);
    });
  };

}]);