elexApp.controller('AuthCtrl', [
'$scope',
'$state',
'resetter',
'auth',
function($scope, $state,resetter,auth){
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

  $scope.forgotPw = function() {
    auth.forgotPw($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('login');
      console.log('user found');
    }); 
  }; //send email with request

  $scope.resetUserPass = function(){
    resetter.resetUserPass($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('login');
      console.log('password reset');
    }); 

  };// reset password if token is still valid
}])