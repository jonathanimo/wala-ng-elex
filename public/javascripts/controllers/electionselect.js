elexApp.controller('ElectionSelectController', function($scope,Restangular,ElectionFactory,elections) {
    var baseElections = elections.getList().$object;
    $scope.listElections = baseElections;
    $scope.newElection = function(){
        var name = prompt("Choose a race name.")
         var newElex = {
            electionName:name
         }
         baseElections.post(newElex).then(function(el){
            $scope.listElections = elections.getList('races').$object;
         },function error(reason){
            console.log(reason);
         });
    };
     $scope.removeElection = function(e){
        var deadElexId = $scope.listElections[e]._id;
        if (confirm('Are you sure you want to delete this election? \n THIS CANNOT BE UNDONE')){
            elections.one(deadElexId).remove().then(function(e){
                $scope.listElections = elections.getList().$object;
            },function error(reason){
                console.log(reason);
            });
        }
    };
});