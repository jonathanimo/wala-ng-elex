elexApp.controller('ElectionFrontEndController', function($scope,election) {
    $scope.races = election.getList('races').$object;
    election.get().then(function(el){
            $scope.elex = el;
            //console.log($scope.elex);
    },function error(reason){
    	console.log(reason);
    });
});

