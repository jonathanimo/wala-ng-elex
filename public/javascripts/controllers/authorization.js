elexApp.controller('AuthCtrl', 
  [
'$scope',
'$state',
'$stateParams',
'auth',
function($scope,$state,$stateParams,auth,Restangular){
// console.log(user.data);

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

}
]
)