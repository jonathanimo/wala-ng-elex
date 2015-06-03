elexApp.controller('ElectionSelectController', function($scope,Restangular,ElectionFactory) {
    $scope.elections = ElectionFactory.elections;
});