elexApp.factory('auth', ['Restangular','$http', '$window', function(Restangular,$http, $window){
  var auth = {};
    auth.saveToken = function (token){
      $window.localStorage['ng-elex-token'] = token;
    };

    auth.getToken = function (){
      return $window.localStorage['ng-elex-token'];
    }
  auth.isLoggedIn = function(){
    var token = auth.getToken();

    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      Restangular.setDefaultHeaders({Authorization: 'Bearer '  + token});
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };
  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };
  auth.register = function(user){
    var name = user.username;
    console.log(user.username);
    return $http.post('/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user){
    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('ng-elex-token');
    location.reload(true);
  };

  //returns 400 bad request on post
  auth.forgotPw = function(email){
    return $http.post('/forgot', email).success(function(data){
    console.log('done');
    });
  };
  auth.resetPw = function(){

  };
  //RestangularProvider.setDefaultHeaders({Authorization: Bearer " + auth.getToken() + "});
  return auth;
}])