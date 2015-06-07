elexApp.controller('ElectionFrontEndController', function($scope,election) {
    $scope.races = election.getList('races').$object;
    $scope.election = election.get().$object;
    console.log($scope.races);
    console.log(election);
});

