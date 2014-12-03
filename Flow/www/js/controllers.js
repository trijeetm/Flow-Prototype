var Flow = angular.module('starter.controllers', [])

Flow.controller('AppCtrl', function($scope, $ionicModal, $timeout, ideaboard, $window, $location, projects, tasklist, notelist) {
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

  // WoZ Tasklist
  tasklist.insert({ projectId: 1, title: 'Task 1', desc: 'This is complicated task.' });
  tasklist.insert({ projectId: 1, title: 'Task 2', desc: 'This is complicated task.' });
  tasklist.insert({ projectId: 1, title: 'Task 3', desc: 'This is complicated task.' });
  tasklist.insert({ projectId: 2, title: 'Task 4', desc: 'This is complicated task.' });
  tasklist.insert({ projectId: 2, title: 'Task 5', desc: 'This is complicated task.' });

  // WoZ notelist
  notelist.insert({ projectId: 1, title: 'Note 1', desc: 'This is inspiring note.' });
  notelist.insert({ projectId: 1, title: 'Note 2', desc: 'This is inspiring note.' });
  notelist.insert({ projectId: 2, title: 'Note 3', desc: 'This is inspiring note.' });
  notelist.insert({ projectId: 2, title: 'Note 4', desc: 'This is inspiring note.' });
  notelist.insert({ projectId: 2, title: 'Note 5', desc: 'This is inspiring note.' });
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

Flow.controller('ProjectCtrl', function($scope, projects, tasklist, notelist, $location) {
  $scope.id = $location.$$url.substring(
    '/app/projects/'.length, $location.$$url.length
  );
  
  $scope.project = projects.projects[$scope.id - 1];

  filterListByProjectId = function(list, id) {
    filteredList = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].projectId == id) {
        filteredList.push(list[i]);
      };
    };
    return filteredList;
  };

  $scope.tasks = filterListByProjectId(tasklist.tasks, $scope.id);
  $scope.notes = filterListByProjectId(notelist.notes, $scope.id);

  console.log($scope.tasks);
  console.log($scope.notes);
})

Flow.controller('IdeaboardCtrl', function($scope, ideaboard, $window) {
  $scope.ideaboard = ideaboard.ideas;
});
