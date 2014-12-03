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

  // go back
  var goBack = function() {
    $window.history.back();
  };
  $scope.goBack = goBack;

  // WoZ for ideaboard
  $scope.addInspiration({ title: "Haider - A short play", desc: "An international representation of Shakespeare's Macbeth" });
  $scope.addInspiration({ title: "Jazz Project", desc: "A synth based jazz composition on the C-minor pentatonic scale" });

  // WoZ Projects
  projects.insert({ title: 'Project1', desc: 'Desc1' });
  projects.insert({ title: 'Project2', desc: 'Desc2' });
  projects.insert({ title: 'Project3', desc: 'Desc3' });

  // WoZ Tasklist
  tasklist.insert({ projectId: 1, title: 'Task 1', desc: 'This is complicated task.', deadline: new Date('December 17, 1995 03:24:00') });
  tasklist.insert({ projectId: 1, title: 'Task 2', desc: 'This is complicated task.', deadline: null });
  tasklist.insert({ projectId: 1, title: 'Task 3', desc: 'This is complicated task.', deadline: new Date('December 17, 1995 03:24:00') });
  tasklist.insert({ projectId: 2, title: 'Task 4', desc: 'This is complicated task.', deadline: null });
  tasklist.insert({ projectId: 2, title: 'Task 5', desc: 'This is complicated task.', deadline: new Date('December 17, 1995 03:24:00') });

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

Flow.controller('ProjectCtrl', function($scope, projects, tasklist, notelist, $location, $ionicModal, $timeout) {
  // data init
  $scope.projectId = $location.$$url.substring(
    '/app/projects/'.length, $location.$$url.length
  );
  $scope.tasks = [];
  $scope.notes = [];

  $scope.project = projects.projects[$scope.projectId - 1];

  filterListByProjectId = function(list, id) {
    filteredList = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].projectId == id) {
        filteredList.push(list[i]);
      };
    };
    return filteredList;
  };

  var _tasks = filterListByProjectId(tasklist.tasks, $scope.projectId);
  // for (var i = 0; i < _tasks.length; i++) {
  //   console.log(_tasks[i].deadline);
  //   if (_tasks[i].deadline === null) {
  //     _tasks[i].deadlineStr = 'Unscheduled task. Add a deadline?';
  //   }
  //   else {
  //     if (typeof _tasks[i].deadline != 'string') {
  //       _tasks[i].deadlineStr = "Deadline: " + _tasks[i].deadline.toDateString() + " " + _tasks[i].deadline.toLocaleTimeString();   
  //     };
  //   };
  // };
  $scope.tasks = _tasks;
  $scope.notes = filterListByProjectId(notelist.notes, $scope.projectId);

  console.log('tasks:', $scope.tasks);
  console.log('notes:',$scope.notes);

  // modals
  // Form data for the task modal
  $scope.NTData = {};

  // Create the AI modal that we will use later
  $ionicModal.fromTemplateUrl('templates/newTask.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.NTModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeNTModal = function() {
    $scope.NTModal.hide();
  };

  // Open the login modal
  $scope.openNTModal = function() {
    $scope.NTModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.addNewTask = function() {
    var newTask = $scope.NTData;
    if (($scope.NTData.deadlineDate) || ($scope.NTData.deadlineTime)) {
      newTask.deadline = new Date();
    } else {
      newTask.deadline = null;
    };
    newTask.projectId = $scope.projectId;
    console.log('Creating new task', newTask);
    tasklist.insert(newTask);
    $scope.tasks.push(newTask);
    $scope.NTData = {};
    $timeout(function() {
      $scope.closeNTModal();
      // $location.path('/app/ideaboard');
    }, 50);
  };

  // Form data for the note modal
  $scope.NNData = {};

  // Create the AI modal that we will use later
  $ionicModal.fromTemplateUrl('templates/newNote.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.NNModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeNNModal = function() {
    $scope.NNModal.hide();
  };

  // Open the login modal
  $scope.openNNModal = function() {
    $scope.NNModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.addNewNote = function() {
    var newNote = $scope.NNData;
    newNote.projectId = $scope.projectId;
    console.log('Creating new note', newNote);
    notelist.insert(newNote);
    $scope.notes.push(newNote);
    $scope.NNData = {};
    $timeout(function() {
      $scope.closeNNModal();
      // $location.path('/app/ideaboard');
    }, 50);
  };

})

Flow.controller('TaskCtrl', function($scope, tasklist, $location, $window) {
  var taskId = $location.$$url.substring(
    $location.$$url.search('/tasks/') + '/tasks/'.length, $location.$$url.length
  );

  var findTaskById = function(id) {
    for (var i = 0; i < tasklist.tasks.length; i++) {
      if (tasklist.tasks[i].id == id) {
        return tasklist.tasks[i];
      };
    };
  }

  $scope.task = findTaskById(taskId);
 
  if ($scope.task.deadline === null) {
    var date = new Date();
    $scope.task.newDeadlineDate = date;
    $scope.task.newDeadlineTime = date;
    // console.log($scope.task.newDeadlineDate);
    // console.log($scope.task.newDeadlineTime);
  }
  else {
    $scope.task.newDeadlineDate = $scope.task.deadline;
    $scope.task.newDeadlineTime = $scope.task.deadline;
  };

  // deadlineStr
  console.log('deadline:', $scope.task.deadline);
  if ($scope.task.deadline === null) {
    $scope.deadlineBtnMsg = 'Add deadline';
  }
  else {
    $scope.deadlineBtnMsg = 'Edit deadline';
  };

  console.log('task: ', $scope.task);

  $scope.showEditDeadline = false;

  $scope.editDeadline = function() {
    $scope.showEditDeadline = !$scope.showEditDeadline;
    if ($scope.showEditDeadline) {
      $scope.deadlineBtnMsg = 'Save deadline';
    } else {
      // console.log('deadline: ', $scope.task.deadline);
      if ($scope.deadline) {
        $scope.deadlineBtnMsg = 'Add deadline';
      } else {
        $scope.deadlineBtnMsg = 'Edit deadline';
      };
      // if (($scope.task.newDeadlineDate != null) && ($scope.task.newDeadlineTime != null)) {
      //   console.log($scope.task.newDeadlineDate + " " + $scope.task.newDeadlineTime);
      //   $scope.task.deadline = new Date($scope.task.newDeadlineDate.toDateString() + " " + $scope.task.newDeadlineTime.toTimeString());
      // };
      $scope.task.deadline = new Date();
    };
  }
})

Flow.controller('IdeaboardCtrl', function($scope, ideaboard, $window) {
  $scope.ideaboard = ideaboard.ideas;
})

Flow.controller('404Ctrl', function($scope, $window) {

});
