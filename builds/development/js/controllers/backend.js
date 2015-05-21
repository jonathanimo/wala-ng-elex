elexApp.controller('ElectionBackEndController', function($scope,$firebase){
    var ref = new Firebase('https://wala-ng-elex.firebaseio.com/races');
    var races = $firebase(ref);
    $scope.r = races.$asObject();
    $scope.addRace = function(){
        races.$push({
            raceName: $scope.raceName,
            allVotes:$scope.totalVotes,
            isOver:$scope.isOver,
            precinctsRep:$scope.precinctsRep,
            precinctsTotal:$scope.precinctsTotal,
            seats:$scope.raceSeats,
            updated:Firebase.ServerValue.TIMESTAMP,
            candidates:$scope.candidates
        }).then(function(){
            alert('race pushed successfully!');
        }); //end of function to add new race
    };

    $scope.addCandidate = function(){ //on add input button click
        var canCount = $scope.r.candidates.length+1;
        console.log(canCount);
        $scope.candidates.push({});
    };
    $scope.removeCandidate = function(){ //user click on remove text
            if (confirm("Are you sure you want to delete ths candidate? \n THIS CANNOT BE UNDONE!")){ 
                $(this)
                .parent('div.oneCandidate')
                .remove();
                canCount--
            }
        };
    $scope.updateAllVotes = function(){
            {
            this.allVotes += this.candidates[i].voteTotal;
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
