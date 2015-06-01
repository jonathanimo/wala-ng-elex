elexApp.controller('ElectionSelectController', function($scope,ElectionFactory) {
    $scope.elections = ElectionFactory.elections;
});