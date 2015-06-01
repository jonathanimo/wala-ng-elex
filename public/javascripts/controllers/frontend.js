elexApp.controller('ElectionFrontEndController', function($scope,RacesFactory/*,$http,$location*/) {
    $scope.races = RacesFactory.races;
    console.log($scope.races);
    console.log(RacesFactory.races);
    console.log(racesPromise);
});

