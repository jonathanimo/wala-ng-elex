elexApp.controller('ElectionFrontEndController',
	function($scope,$firebase){
		var ref = new Firebase('https://wala-ng-elex.firebaseio.com/races');
		var races = $firebase(ref);
		$scope.r = races.$asObject();
}); // front end controller


/*elexApp.controller('ElectionFrontEndController', [ '$http' , function ($http, $scope) {
	var $scope = this;
	$scope.r = [];
	$http.get('js/races.json').success(function(data){
		$scope.r = (data);
	});
}]);*/


//app.controller('RaceController', function () {});