elexApp.controller('ElectionSelectController', function($scope,Restangular,ElectionFactory) {
    var baseElections = Restangular.all('elections').getList().$object;
    $scope.elections = baseElections;
});