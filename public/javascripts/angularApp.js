var elexApp = angular.module('elexApp', ['ui.router','appControllers']);

var appControllers = angular.module('appControllers',
   [/*'RegistrationController', 'ElectionFrontEndController', 'ElectionBackEndController', 'StatusController'*/]);

/*elexApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
  function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $rootScope.message='Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]);*/

elexApp.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl: 'login.html',
      controller:  'RegistrationController'
    })
    .state('register', {
      url:'/register',
      templateUrl: '/new-user.html',
      controller:  'RegistrationController'
    })
    .state('election', {
      url:'/election/{election}',
      templateUrl: '/races.html',
      controller:  'ElectionFrontEndController'
    })
    .state('update', {
      url:'/update',
      templateUrl: '/election-form.html',
      controller: 'ElectionBackEndController',
      });
    $urlRouterProvider.otherwise('election');
}]);