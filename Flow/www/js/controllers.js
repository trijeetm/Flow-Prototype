var Flow = angular.module('starter.controllers', [])

Flow.controller('AppCtrl', function($scope, $ionicModal, $timeout, ideaboard, $window, $location, projects) {
  // Form data for the login modal
  $scope.AIData = {};

  // Create the AI modal that we will use later
  $ionicModal.fromTemplateUrl('templates/newInspiration.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.AIModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeAIModal = function() {
    $scope.AIModal.hide();
  };

  // Open the login modal
  $scope.openAIModal = function() {
    $scope.AIModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.addNewInspiration = function() {
    console.log('Creating new inspiration', $scope.AIData);
    $scope.addInspiration($scope.AIData);
    $scope.AIData = {};
    $timeout(function() {
      $scope.closeAIModal();
      $location.path('/app/ideaboard');
    }, 50);
  };

  $scope.addInspiration = function (newInspiration) {
    ideaboard.insert(newInspiration);
  };

  // WoZ for ideaboard
  $scope.addInspiration({ title: "Haider - A short play", desc: "An international representation of Shakespeare's Macbeth" });
  $scope.addInspiration({ title: "Jazz Project", desc: "A synth based jazz composition on the C-minor pentatonic scale" });

  // WoZ Projects
  projects.insert({ title: 'Project1', desc: 'Desc1', id: 1 });
  projects.insert({ title: 'Project2', desc: 'Desc2', id: 2 });
})

Flow.controller('PlaylistsCtrl', function($scope, $rootScope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 },
    { title: 'Trijeet', id: 7 },
    { title: 'Genie', id: 8 }, 
    { title: 'Ken', id: 9 }
  ];
})

Flow.controller('PlaylistCtrl', function($scope, $stateParams) {
})

Flow.controller('HomeCtrl', function($scope) {

})

Flow.controller('NewProjectCtrl', function($scope, $timeout, $location, projects) {
  $scope.newProjectData = {};

  $scope.createNewProject = function () {
    console.log($scope.newProjectData);
    console.log(projects.projects.length);
    project = $scope.newProjectData;
    project.id = projects.projects.length + 1;
    projects.insert(project);
    $timeout(function () {
      $location.path('/app/projects');
    }, 100);
  }
})

Flow.controller('ProjectsCtrl', function($scope, projects) {
  console.log(projects.projects);
  $scope.projects = projects.projects;
})

Flow.controller('IdeaboardCtrl', function($scope, ideaboard, $window) {
  $scope.ideaboard = ideaboard.ideas;
});
