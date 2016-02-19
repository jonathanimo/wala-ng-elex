elexApp.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('allElections');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('allElections');
    });
  };

    //returns 400 bad request on post
  $scope.forgotPw = function() {
    auth.forgotPw($scope.email).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('login');
    }); 
  }; //send email with request

  $scope.resetPw = function(){

  };// reset password if token is still valid
}])