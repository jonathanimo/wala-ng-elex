elexApp.controller('ElectionFrontEndController', function($scope,ElectionFactory,$stateParams,$location) {
   	$scope.races = ElectionFactory.election[$stateParams.election];
   	console.log($scope.races);
   	console.log(ElectionFactory.election);

});


//app.controller('RaceController', function () {});

// $scope.getAll = function(){
//    	 $http.get('js/races.json').success(function(data) { 
// 	   	 	$scope.r = data; 
// 	   	 });
// 	   	}
// 	   	$scope.getAll();

//$scope.post = posts.posts[$stateParams.id];