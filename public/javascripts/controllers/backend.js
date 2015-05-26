elexApp.controller('ElectionBackEndController', function($scope){

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
