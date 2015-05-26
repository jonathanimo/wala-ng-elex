elexApp.controller('StatusController', function($scope, 
  $location) {

  $scope.logout = function() {
    $location.path('/login');
  }; //logout

}); //StatusController