var elexApp = angular.module('elexApp', ['ui.router','restangular','appControllers']);

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

elexApp.config(['$stateProvider','$urlRouterProvider','RestangularProvider', function($stateProvider, $urlRouterProvider, RestangularProvider) {
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
        elections: function(Restangular){
          return Restangular.all('elections');
        }
      }
    })
    .state('oneElection', {
      url:'/elections/{election}',
      templateUrl: '/races.html',
      controller:  'ElectionFrontEndController',
      resolve: {
        races: function($stateParams, Restangular){
          return Restangular.one('elections',$stateParams.election).get();
        }
      }
    })
    .state('edit', {
      url:'/edit/{election}',
      templateUrl: '/election-form.html',
      controller: 'ElectionBackEndController',
      resolve: {
        races: function($stateParams, Restangular){
        return Restangular.one('elections',$stateParams.election).get();
        }
      }
      });
    $urlRouterProvider.otherwise('elections');

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRestangularFields({
        id: '_id.ObjectId'
    });

}]);