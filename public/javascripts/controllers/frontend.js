elexApp.controller('ElectionFrontEndController', function($scope,socket,election) {
	$scope.races = election.getList('races').$object;
	socket.on('init', function(data){
		 
	})
	socket.on('election updated', function(data){
		$scope.races = election.getList('races').$object;
	})
    election.get().then(function(el){
            $scope.elex = el;
            //console.log($scope.elex);
    },function error(reason){
    	console.log(reason);
    });
});

