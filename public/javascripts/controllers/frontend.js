elexApp.controller('ElectionFrontEndController', function($scope,RacesFactory) {
    $scope.races = RacesFactory.races.races;
    $scope.election = RacesFactory.races;
    // console.log($scope.races);
    console.log($scope.election);
});

