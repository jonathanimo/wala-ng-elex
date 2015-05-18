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
        }).then(function(){
            $scope.raceName='';
        }); // 
}


    updateAllVotes = function(){
        for(var i = 0; i < this.candidates.length;i++){
            this.allVotes += this.candidates[i].voteTotal;
        };
    }
    setPcts = function(){
        for(var i = this.candidates.length-1; i >= 0; i--){
            this.candidates[i].pctTotal=Math.floor(this.candidates[i].voteTotal/this.allVotes*100);
        };
    }
    for (var i = $scope.r.length - 1; i >= 0; i--) { //each statement to iterate through all races
        $scope.candidates[i].updateAllVotes();
        $scope.candidates[i].setPcts();
    }
});
