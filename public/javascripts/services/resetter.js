elexApp.factory('ResetFactory', ['Restangular','$http','resetter', function(Restangular,$http,resetter) {
  resetter.resetUserPass = function(user){
    payload = $http.get('/reset',user);
    user = {};
    user.username = payload.username;
    return user;
  };

  resetter.resetRender = function(user){
    return $http.get('/reset/' + user).then(function(req){
      return resetter.user = req.data;
    });
  };

  return resetter;
}]);