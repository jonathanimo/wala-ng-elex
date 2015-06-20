elexApp.controller('ElectionBackEndController', function($scope,$stateParams,Restangular,election){
    $scope.races = election.getList('races').$object;
    $scope.ele = election.get().$object;
    $scope.activeRace = "waiting";

    $scope.setRace = function(newRace){
        $scope.activeRace = newRace;
    };

    $scope.showRace = function(race){
        return $scope.activeRace === race;
    };

    $scope.addCandidate = function(race){ //on add input button click
        var newCan = {
            firstName: "First name",
            lastName: "Last Name",
            party: "party"
        };
        var theRace = $scope.races[race]._id;
        election.one('race',theRace).post('candidate', newCan).then(function(can){
            $scope.races = election.getList('races').$object;
        },function error(reason){
            console.log(reason);
        });
    };

    $scope.removeCandidate = function(race,candidate){ //user click on remove a candidate
        var deadCanId= $scope.races[race].candidates[candidate]._id;
        var theRace = $scope.races[race]._id;
        if (confirm("Are you sure you want to delete ths candidate? \n THIS CANNOT BE UNDONE!")){
            $scope.updateElection();
            election.one('race',theRace).one('candidate', deadCanId).remove().then(function(can){
            $scope.races = election.getList('races').$object;
        },function error(reason){
            console.log(reason);
        });
        }
    };

    $scope.updateRaceCans = function(r,c){//updates candidates on update
        var theTotal = 0;
        for (var n = c.length - 1; n >= 0; n--) { 
            var theCan = $scope.races[r].candidates[n];
            var canVotes = parseInt(theCan.voteTotal);
            theTotal += canVotes;
            election.one('races',theRace._id).one('candidate', theCan._id).customPUT(theCan).then(function(can){
                return theTotal;
            },function error(reason){
                console.log(reason);
            });
        };
    }

    $scope.updateAllRaces = function(){
            for (var i = $scope.races.length - 1; i >= 0; i--) {
            var candidates = $scope.races[i].candidates;
            var theRace = $scope.races[i];
            $scope.updateRaceCans($scope.races[i],$scope.races[i].candidates);
            if (theRace) {
                theRace.allVotes = $scope.updateRaceCans.theTotal;
                election.one('races',theRace._id).customPUT(theRace).then(function(race){
                 //$scope.races = election.getList('races').$object;
                },function error(reason){
                    console.log(reason);
                });  
            };
        }

    }

    $scope.updateElection = function(){
        for (var i = $scope.races.length - 1; i >= 0; i--) {
            var candidates = $scope.races[i].candidates;
            var theRace = $scope.races[i];
            $scope.updateRaceCans($scope.races[i],$scope.races[i].candidates);
            if (theRace) {
                theRace.allVotes = $scope.updateRaceCans.theTotal;
                election.one('races',theRace._id).customPUT(theRace).then(function(race){
                 //$scope.races = election.getList('races').$object;
                },function error(reason){
                    console.log(reason);
                });  
            };
        }
    };

    $scope.addRace = function(){
        var name = prompt("Choose a race name.")
        if (name != null){
            var newRace = {
                raceName: name
            }
            election.post('race', newRace).then(function(race){
                $scope.races = election.getList('races').$object;
            },function error(reason){
                console.log(reason);
            });
        }
    };

    $scope.removeRace = function(race){
        var deadRaceId = $scope.races[race]._id;
        if (confirm('Are you sure you want to delete this race? \n THIS CANNOT BE UNDONE')){
            election.one('races',deadRaceId).remove().then(function(race){
                $scope.races = election.getList('races').$object;
                if ($scope.races.length === 0) {
                    $scope.activeRace = "waiting";
                }
            },function error(reason){
                console.log(reason);
            });
        }
    };
   

   $scope.setPcts = function(race){
       
    };

});