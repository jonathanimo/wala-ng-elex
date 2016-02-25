var elexApp = angular.module('elexApp', [
  'ui.router',
  'restangular',
  'ui.bootstrap',
  'appControllers'
  ]);

var appControllers = angular.module('appControllers',
   [/*'RegistrationController', 'ElectionFrontEndController', 'ElectionBackEndController', 'StatusController'*/]);

elexApp.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals);
  };
}]);

elexApp.config([
  '$stateProvider',
  '$urlRouterProvider',
  'RestangularProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider) {
  $stateProvider
    .state('allElections', {
      url:'/elections',
      templateUrl: '/election-select.html',
      controller:  'ElectionSelectController',
      resolve: {
        elections: function(Restangular,ElectionFactory){
          return ElectionFactory.getAll();
        }
      }
    })
    .state('oneElection', {
      url:'/elections/{election}',
      templateUrl: '/races.html',
      controller:  'ElectionFrontEndController',
      resolve: {
        election: function($stateParams,Restangular,ElectionFactory){
          return ElectionFactory.getOne($stateParams.election);
        }
      }
    })
    .state('edit', {
      url:'/edit/{election}',
      templateUrl: '/election-form.html',
      controller: 'ElectionBackEndController',
      resolve: {
        election: function($stateParams,Restangular,ElectionFactory){
          return ElectionFactory.getOneToEdit($stateParams.election);
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state','auth', function($state,auth){
        if(auth.isLoggedIn()){
          $state.go('allElections');
        }
      }]
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: '/forgot.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state){
      }]
    })
    //todo: fix after response.json render
    .state('reset', {
      url: '/reset/{user}',
      templateUrl: '/reset.html',
      controller: 'AuthCtrl',
      resolve: {
        reset: function($stateParams,auth){
          return auth.resetUserPass($stateParams.user);
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('allElections');
        }
      }]
    })
    $urlRouterProvider.otherwise('elections');
    //TODO Make this work with restangular
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRestangularFields({
        id: '_id.ObjectId'
    });

}]);