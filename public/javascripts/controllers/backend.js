elexApp.controller('ElectionBackEndController', function($scope,$stateParams, RacesFactory){

    $scope.races = RacesFactory.races.races;
    console.log($scope.races);
    console.log(RacesFactory.races);
    var raceCount = $scope.races.length;

    $scope.addCandidate = function(race){ //on add input button click
        var canCount = $scope.races[race].candidates.length;
        $scope.races[race].candidates.push({});
        //$scope.putCandidates($stateParams.id, $scope.races.candidates, )
        canCount++;
        console.log(canCount);
    };

    $scope.addRace = function(){
        var currRaces = $scope.races;
        //$scope.races.push({});
        raceCount++;
        console.log(raceCount);
        console.log('addRace fired');
    }
    $scope.updateRace = function(){
        if ($scope.raceName === "") {return;}
        RacesFactory.putRaces(RacesFactory.races._id, {
            raceName: $scope.raceName,
            allVotes: $scope.allVotes,
            //candidates: $scope.candidates,
            precinctsRep : $scope.precinctsRep,
            precinctsTotal : $scope.precinctsTotal,
            seats : $scope.seats,
            updated: Date.now()
        }).success(function(race){
            $scope.races.push(race);
        })
        console.log('updateRace fired');
    }


    $scope.removeCandidate = function(candidate){ //user click on remove text
            if (confirm("Are you sure you want to delete ths candidate? \n THIS CANNOT BE UNDONE!")){ 
            }
        };
    $scope.updateAllVotes = function(race){
        var theTotal = $scope.races[race].allVotes;
        for (var i = $scope.races[race].candidates.length - 1; i >= 0; i--) {
            theTotal += $scope.races[race].candidates[i].voteTotal;
        };
    }
   

    // $scope.setPcts = function(){
    //     for(var i = this.candidates.length-1; i >= 0; i--){
    //         this.candidates[i].pctTotal=Math.floor(this.candidates[i].voteTotal/this.allVotes*100);
    //     };
    // }
    // for (var i = $scope.r.length - 1; i >= 0; i--) { //each statement to iterate through all races
    //     $scope.candidates[i].updateAllVotes();
    //     $scope.candidates[i].setPcts();
    // }
});
