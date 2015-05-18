var elexApp = angular.module('elexApp', ['ngRoute',
'firebase', 'appControllers'])
.constant('FIREBASE_URL', 'https://wala-ng-elex.firebaseio.com/');

var appControllers = angular.module('appControllers',
  ['firebase', /*'RegistrationController', 'ElectionFrontEndController', 'ElectionBackEndController', 'StatusController'*/]);

elexApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
  function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $rootScope.message='Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]);

elexApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: '/views/login.html',
      controller:  'RegistrationController'
    }).
    when('/register', {
      templateUrl: '/views/new-user.html',
      controller:  'RegistrationController'
    }).
    when('/races', {
      templateUrl: '/views/races.html',
      controller:  'ElectionFrontEndController'
    }).
    when('/update', {
      templateUrl: '/views/election-form.html',
      controller: 'ElectionBackEndController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);