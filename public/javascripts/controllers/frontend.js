elexApp.controller('ElectionFrontEndController', function($scope, $http, $stateParams, ElectionFactory,$location) {
   ElectionFactory.getRaces().success(function(data){
   		$scope.races=data[$stateParams.election].races;
   });
});


//app.controller('RaceController', function () {});

// $scope.getAll = function(){
//    	 $http.get('js/races.json').success(function(data) { 
// 	   	 	$scope.r = data; 
// 	   	 });
// 	   	}
// 	   	$scope.getAll();