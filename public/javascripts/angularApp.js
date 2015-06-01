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
    .state('allElections', {
      url:'/elections',
      templateUrl: '/election-select.html',
      controller:  'ElectionSelectController',
      resolve: {
        electionPromise: ['ElectionFactory', function(ElectionFactory){
          return ElectionFactory.getAll();
        }]
      }
    })
    .state('oneElection', {
      url:'/elections/{election}',
      templateUrl: '/races.html',
      controller:  'ElectionFrontEndController',
      resolve: {
        racesPromise: ['$stateParams','RacesFactory', function($stateParam, RacesFactory){
          return RacesFactory.getRaces($stateParams.election)
        }]
      }
    })
    .state('update', {
      url:'/update',
      templateUrl: '/election-form.html',
      controller: 'ElectionBackEndController',
      });
    $urlRouterProvider.otherwise('elections');
}]);