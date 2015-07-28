angular.module('app', ['angular-storage', 'ui.router', 'react', 'angular-riot', 'ngAnimate', 'oc.lazyLoad', 'ng.picturefill', 'youtube-embed'])
    // speed up touch events
    .run(function(){
      FastClick.attach(document.body);
    })
    .config(function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
      // prep for html5 history activation
      $locationProvider.hashPrefix('!');

      // 404 type redirect
      $urlRouterProvider.otherwise('/home');

      // fix external links
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

      // now define states & their resolutions
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/templates/home.view.html',
          controller: 'HomeController',
          controllerAs: 'home',
          resolve: {
            resolveObj: function($ocLazyLoad){
              return $ocLazyLoad.load({
                name: 'appHome',
                files: ['/js/home.js']
              });
            }
          }
        }); // end stateProvider declaration

      // /!\ Without server side support html5 must be disabled.
      return $locationProvider.html5Mode(true);

    });







