elexApp.controller('ElectionFrontEndController', function($scope,socket,election) {
	$scope.races = election.getList('races').$object;
	socket.on('init', function(data){
		 
	})
	$scope.showNav = false;

    election.get().then(function(el){
            $scope.elex = el;
            //console.log($scope.elex);
    },function error(reason){
    	console.log(reason);
    });

	socket.on('election updated', function(data){
		$scope.elex.precinctsRep = data.precinctsRep;
		$scope.elex.electionDate = data.electionDate;
		for (var n = 0; n < $scope.races.length; n++) {
			var oneRace = $scope.races[n];
			for (var i = 0; i < oneRace.candidates.length; i++) {
				var oneCand = oneRace.candidates[i];
				oneCand.voteTotal = data.races[n].candidates[i].voteTotal;
			}
			oneRace.allVotes = data.races[n].allVotes;
		}
	})
});

