elexApp.controller('ElectionBackEndController', function($scope,$stateParams,$http,Restangular,election,auth){
    
    var rand = new Chance();
    $scope.ele = election.get().$object;
    $scope.races = election.getList('races').$object;
    var authHeader = "{Authorization: Bearer " + auth.getToken() + "}";
    // election.get().then(function(e){
    //     $scope.ele = e;
    //     $scope.races = e.races;
    // },function error(reason){
    //     console.log(reason);
    // });

    $scope.activeRace = "waiting";

    $scope.setRace = function(newRace){
        $scope.activeRace = newRace;
    };

    $scope.showRace = function(race){
        return $scope.activeRace === race;
    };

    $scope.addCandidate = function(race){ //on add input button click
        var newCan = {
            firstName: rand.first(),
            lastName: rand.last(),
            party: "party"
        };
        $scope.updateElection();
        var theRace = $scope.races[race]._id;
        election.one('race',theRace).withHttpConfig(authHeader).post('candidate', newCan).then(function(can){
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
            election.one('race',theRace).one('candidate', deadCanId).withHttpConfig(authHeader).remove().then(function(can){
            $scope.races = election.getList('races').$object;
        },function error(reason){
            console.log(reason);
        });
        }
    };

<<<<<<< HEAD
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
=======
$scope.updateElection = function(){
    if ($scope.races) {
         for (var i = $scope.races.length - 1; i >= 0; i--) {
             var candidates = $scope.races[i].candidates;
             var theRace = $scope.races[i];
             var theTotal = 0;
             for (var n = candidates.length - 1; n >= 0; n--) { //updates candidates on update
                var theCan = $scope.races[i].candidates[n];
                var canVotes = parseInt(theCan.voteTotal);
                theTotal += canVotes;
                election.one('races',theRace._id).one('candidate', theCan._id).withHttpConfig(authHeader).customPUT(theCan).then(function(can){
                },function error(reason){
                    console.log(reason);
                });
            };
            theRace.allVotes = theTotal;
           
            election.one('races',theRace._id).withHttpConfig(authHeader).customPUT(theRace).then(function(race){
                //$scope.races = election.getList('races').$object;
            },function error(reason){
                console.log(reason);
            });            
        }
        election.withHttpConfig(authHeader).customPUT($scope.ele).then(function(e){
            $scope.ele = election.get().$object;
         },function error(reason){
             console.log(reason);
        }); 
    }
    else{
        election.withHttpConfig(authHeader).customPUT($scope.ele).then(function(e){
            $scope.ele = election.get().$object;
            $scope.races = election.getList('races').$object;
        },function error(reason){
            console.log(reason);
        });
    }
}
           

    $scope.addRace = function(){
        var name = prompt("Choose a race name.")
         var newRace = {
            raceName: rand.string()
         }
         $scope.updateElection();
         election.withHttpConfig(authHeader).post('race', newRace).then(function(race){
            $scope.races = election.getList('races').$object;
         },function error(reason){
            console.log(reason);
         });
>>>>>>> temp-stuff
    };

    $scope.removeRace = function(race){
        var deadRaceId = $scope.races[race]._id;
        if (confirm('Are you sure you want to delete this race? \n THIS CANNOT BE UNDONE')){
            $scope.updateElection();
            election.one('races',deadRaceId).withHttpConfig(authHeader).remove().then(function(race){
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