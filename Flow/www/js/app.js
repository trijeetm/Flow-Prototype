// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.ideaboard', {
      url: "/ideaboard",
      views: {
        'menuContent' :{
          templateUrl: "templates/ideaboard.html",
          controller: 'IdeaboardCtrl'
        }
      }
    })

    .state('app.newProject', {
      url: "/newproject",
      views: {
        'menuContent' :{
          templateUrl: "templates/newProject.html",
          controller: 'NewProjectCtrl'
        }
      }
    })

    .state('app.projects', {
      url: "/projects",
      views: {
        'menuContent' :{
          templateUrl: "templates/projects.html",
          controller: 'ProjectsCtrl'
        }
      }
    })

    .state('app.project', {
      url: "/projects/:projectID",
      views: {
        'menuContent' :{
          templateUrl: "templates/project.html",
          controller: 'ProjectCtrl'
        }
      }
    })

    .state('app.projectTasks', {
      url: "/projects/:projectID/tasks/:taskID",
      views: {
        'menuContent' :{
          templateUrl: "templates/task.html",
          controller: 'TaskCtrl'
        }
      }
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.404', {
      url: "/404",
      views: {
        'menuContent' :{
          templateUrl: "templates/404.html",
          controller: '404Ctrl'
        }
      }
    })

    .state('app.webview', {
      url: "/webview",
      views: {
        'menuContent' :{
          templateUrl: "templates/webview.html"
          // controller: '404Ctrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

