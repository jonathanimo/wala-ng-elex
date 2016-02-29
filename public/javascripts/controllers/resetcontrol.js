elexApp.controller('ResetCtrl', 
  [
'$scope',
'$state',
'$stateParams',
'Restangular',
'resetFactory',
function($scope,$state,$stateParams,Restangular,resetFactory,user){

  $scope.resetPass = function(){
    // console.log($scope.user);
    // console.log($scope.user.confirmNewPassword);
    if ($scope.user.newPassword != $scope.user.confirmNewPassword) {
      $scope.error = "Passwords don't match, WTF?"
      // console.log('passwords don\'t match');
    }
    else{
      resetFactory.resetUserPass($stateParams.user, $scope.user).error(function(error){
        $scope.error = error;
        console.log(error);
      }).then(function(){
        $state.go('login');
        console.log('password reset');
      }); 
    };
  };// reset password if token is still valid and new password matches confirmation field
}])