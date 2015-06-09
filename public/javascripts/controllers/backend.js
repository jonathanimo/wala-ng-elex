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

   
    
    $scope.updateElection = function(e){
        var races = election.all('races').getList().then(function(races){
            for (var i = races.length - 1; i >= 0; i--) {
                var candidates = races[i].candidates;
                    for (var i = candidates.length - 1; i >= 0; i--) {
                        console.log(candidate[i]);
                       // election.one('race',r).save('candidate', candidates[i]._id).then(function(can)election.candidates[i]._id);
                    };
            };
        });
        // then(function(races){
        //     console.log(races.$object);
        //     races.put().then(function(){
        //         election.put().then(function(){
        //             console.log(election);
        //             $scope.races = election.getList('races').$object;
        //         } , function error(reason){
        //             console.log(reason);
        //         }
        //         );
        //     });
        // });
    }

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
