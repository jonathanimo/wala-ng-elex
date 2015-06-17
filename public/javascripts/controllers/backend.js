elexApp.controller('ElectionBackEndController', function($scope,$stateParams,Restangular,election){
    $scope.races = election.getList('races').$object;
    var raceCount = $scope.races.length;

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
        console.log(theRace);
    };

    $scope.removeCandidate = function(race,candidate){ //user click on remove text
        var deadCanId= $scope.races[race].candidates[candidate]._id;
        var theRace = $scope.races[race]._id;
        if (confirm("Are you sure you want to delete ths candidate? \n THIS CANNOT BE UNDONE!")){ 
           election.one('race',theRace).one('candidate', deadCanId).remove().then(function(can){
            $scope.races = election.getList('races').$object;
        },function error(reason){
            console.log(reason);
        });
        }
        console.log(deadCanId);
    };

   
    
<<<<<<< HEAD
$scope.updateElection = function(){
    var races = election.all('races').getList().then(function(races){
        for (var i = races.length - 1; i >= 0; i--) {
            var candidates = races[i].candidates;
            var theRace = $scope.races[i];
            for (var n = candidates.length - 1; n >= 0; n--) { //updates candidates on update
                var theCan = $scope.races[i].candidates[n];
                election.one('races',theRace._id).one('candidate', theCan._id).customPUT(theCan).then(function(can){
                    $scope.races = election.getList('races').$object;
                },function error(reason){
                    console.log(reason);
                });
            };
            election.one('races',theRace._id).customPUT(theRace).then(function(race){
                $scope.races = election.getList('races').$object;
            },function error(reason){
                console.log(reason);
            });            
        }
    });
};
=======
    $scope.updateElection = function(){
        var races = election.all('races').getList().then(function(races){
            for (var i = races.length - 1; i >= 0; i--) {
                var candidates = races[i].candidates;
                //console.log(candidates);
                    for (var n = candidates.length - 1; n >= 0; n--) {
                        var theRace = $scope.races[i]._id;
                        var theCan = candidates[n];
                        //console.log(theRace);
                        election.one('races',theRace).one('candidate', theCan._id).put().then(function(can){
                            $scope.races = election.getList('races').$object;
                        },function error(reason){
                            console.log(reason);
                        });                        
                        //election.one('race',r).save('candidate', candidates[i]._id).then(function(can)election.candidates[i]._id);
                    };
            }
            });
    };
>>>>>>> 2733023df64f90dbaf3d7e945eae34581a628826

    $scope.addRace = function(){
        var name = prompt("Choose a race name.")
         var newRace = {
            raceName: name
         }
         election.post('race', newRace).then(function(race){
            $scope.races = election.getList('races').$object;
         },function error(reason){
            console.log(reason);
         });
    };

    $scope.removeRace = function(race){
        var deadRaceId = $scope.races[race]._id;
        if (confirm('Are you sure you want to delete this race? \n THIS CANNOT BE UNDONE')){
            election.one('races',deadRaceId).remove().then(function(race){
                $scope.races = election.getList('races').$object;
            },function error(reason){
                console.log(reason);
            });
        }
    };

    $scope.updateAllVotes = function(race){
        var theTotal = $scope.races[race].allVotes,
        candidates = $scope.races[race].candidates;
        for (var i = $scope.races[race].candidates.length - 1; i >= 0; i--) {
            theTotal += $scope.races[race].candidates[i].voteTotal;
        };
    };
   

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
