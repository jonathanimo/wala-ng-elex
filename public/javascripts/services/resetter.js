elexApp.factory('resetFactory', ['$http', function($http) {
  var r = {};
  r.resetUserPass = function(user,newPassword){
    return $http.put('/reset/' + user, newPassword).success(function(data){
    	console.log(data);
    });
  };
  r.getUser = function(user){
    return $http.get('/reset/' + user).then(function(req){
    	return req.data;
	});
  }
  return r;
}]);