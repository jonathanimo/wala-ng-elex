elexApp.controller('ElectionSelectController', function($scope,Restangular,ElectionFactory,elections) {
    var baseElections = elections.getList().$object;
    $scope.elections = baseElections;
});