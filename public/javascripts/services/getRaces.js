elexApp.factory('ElectionFactory', function($http) {
 return {
    getRaces : function() {
        return $http({
            url: 'javascripts/races.json',
            method: 'GET'
        })
    }
 }
});