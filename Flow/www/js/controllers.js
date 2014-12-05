var Flow = angular.module('starter.controllers', [])

Flow.controller('AppCtrl', function($scope, $ionicModal, $timeout, ideaboard, $window, $location, projects, tasklist, notelist) {
  // To Do:

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
    var imgId = Math.floor(Math.random() * 3) + 1;
    $scope.AIData.cover = "idea" + imgId;
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
  $scope.addInspiration({ title: "Oblivion - Soundtrack", desc: "Some of the music used in this game might be useful inspiration for a the music in a play one day.", cover: "idea1" });
  $scope.addInspiration({ title: "Jazz", desc: "I should totally write a jazz piece sometime.  Would be good practice!", cover: "idea2" });

  // WoZ Projects
  projects.insert({ title: 'Curtain Calls', desc: 'My first attempt at playwriting, about the struggles of a young girl attempting to break into the Broadway scene.', cover: 'pc1' });
  projects.insert({ title: 'Winter Solstice', desc: 'An intricate piano piece to capture the beauty of the yearly seasonal change into Winter.', cover: 'pc2' });
  projects.insert({ title: 'High Fidelity Prototype', desc: 'A work-in-progress prototype that one particular bada$$ member has done an amazing job with.', cover: 'pc3' });

  // WoZ Tasklist
  tasklist.insert({ 
    projectId: 1, 
    title: 'Main Character Sketch', 
    desc: 'Need to nail down exactly who the "young girl" is.', 
    deadline: new Date('December 17, 1995 03:24:00'), 
    completed: false, 
    comments: [{ author: 'Peter Thiel', comment: 'I would fund that' }, { author: 'Lindsay Lohan', comment: 'Hi, my name is Lindsay Lohan and I add nothing constructive to the conversation' }], snapshots: [{ title: 'Snapshot 1', desc: 'A UI sketch I made for screen X', snap: 'snap1.png' }, { title: 'Snapshot 2', desc: 'A audio recording of the solo section of my latest song', snap: 'snap2.png' }] 
  });
  tasklist.insert({ 
    projectId: 1, 
    title: 'Act I rough draft', 
    desc: 'I have a plot line of what I want to happen, but I need to write the real rough draft.', 
    deadline: null, 
    completed: false, 
    comments: [{ author: 'Peter Thiel', comment: 'I would fund that' }, { author: 'Lindsay Lohan', comment: 'Hi, my name is Lindsay Lohan and I add nothing constructive to the conversation' }], 
    snapshots: [
    { title: 'Scene 1', desc: 'First Scene', snap: 'snap1.png' }, 
    { title: 'Scene 2', desc: 'Second Scene', snap: 'snap2.png' }] 
  });
  tasklist.insert({ 
    projectId: 1, 
    title: 'Develop Supporting Characters List', 
    desc: 'There has to be more characters than just her!', 
    deadline: new Date('December 17, 1995 03:24:00'), 
    completed: false, 
    comments: [], 
    snapshots: [
    { title: 'Character 1', desc: 'A possible secondary female character.', snap: 'snap1.png' }, 
    { title: 'Character 2', desc: 'A possible secondary male character.', snap: 'snap2.png' }] 
  });
  tasklist.insert({ 
    projectId: 2, 
    title: 'Develop the chorus.', 
    desc: 'Need to get the bare bones down.', 
    deadline: null, 
    completed: false, 
    comments: [{ author: 'Peter Thiel', comment: 'I would fund that' }, { author: 'Lindsay Lohan', comment: 'Hi, my name is Lindsay Lohan and I add nothing constructive to the conversation' }], 
    snapshots: [] 
  });
  tasklist.insert({ 
    projectId: 2, 
    title: 'Develop the bridge.', 
    desc: 'It needs to be something mind-blowing!', 
    deadline: new Date('December 17, 1995 03:24:00'), 
    completed: false, 
    comments: [{ author: 'Peter Thiel', comment: 'I would fund that' }, { author: 'Lindsay Lohan', comment: 'Hi, my name is Lindsay Lohan and I add nothing constructive to the conversation' }], 
    snapshots: [
    { title: 'A potential Key', desc: 'What do you guys think?  Major or Minor?', snap: 'snap1.png' }, 
    { title: 'A tune snippet', desc: 'Mind-blowing enough?', snap: 'snap2.png' }] 
  });

  // WoZ notelist
  notelist.insert({ projectId: 1, title: 'Flaws?', desc: 'She needs some serious character flaws...Maybe lack of discipline?' });
  notelist.insert({ projectId: 1, title: 'New York Bar', desc: 'I think a seedy New York Bar should factor in prominently...' });
  notelist.insert({ projectId: 2, title: 'Pandora', desc: 'I need to remember to listen to Pandora more often for inspiration.' });
  notelist.insert({ projectId: 2, title: 'Harp Solo', desc: 'Try to remember that one piece by that one guy' });
  notelist.insert({ projectId: 2, title: 'Meredith?', desc: 'Meredith was humming a really interesting tune a while ago...' });
})

Flow.controller('HomeCtrl', function($scope, projects, ideaboard) {
  $scope.projects = projects.projects;
  $scope.ideaboard = ideaboard.ideas;
})

Flow.controller('NewProjectCtrl', function($scope, $timeout, $location, projects, $ionicActionSheet, $rootElement) {
  $scope.newProjectData = {};

  var project = {};
  var imgId = Math.floor(Math.random() * 3) + 1;

  $scope.createNewProject = function () {
    // console.log($scope.newProjectData);
    // console.log(projects.projects.length);
    project = $scope.newProjectData;
    if (!project.cover) {
      project.cover = "pc" + imgId;
    };
    console.log(project);
    projects.insert(project);
    $timeout(function () {
      $location.path('/app/projects');
    }, 100);
  };


  // Triggered on a button click, or some other target
  $scope.showSheet = function() {
  // console.log('sanity');
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Choose From Library' },
        { text: 'Capture New Media' }
      ],
      // destructiveText: 'Delete',
      titleText: 'Add cover image',
      cancelText: 'Cancel',
      cancel: function() {
        hideSheet();
      },
      buttonClicked: function(index) {
        console.log('sanity');
        project.cover = "pc" + imgId + ".png";
        var img = $rootElement.find('img');
        img[0].src = 'img/' + project.cover;
        // console.log(img);
        return true;
      }
    });

   // For example's sake, hide the sheet after two seconds
   // $timeout(function() {
   //   hideSheet();
   // }, 2000);

  };
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
    newTask.comments = [];
    newTask.snapshots = [];
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

Flow.controller('TaskCtrl', function($scope, tasklist, $location, $window, $ionicActionSheet, $ionicPopup, $timeout) {
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
    $scope.deadlineBtnMsg = '';
  };

  console.log('task: ', $scope.task);

  $scope.showEditDeadline = false;

  $scope.editDeadline = function() {
    $scope.showEditDeadline = !$scope.showEditDeadline;
    if ($scope.showEditDeadline) {
      $scope.deadlineBtnMsg = 'Save';
    } else {
      // console.log('deadline: ', $scope.task.deadline);
      if ($scope.deadline) {
        $scope.deadlineBtnMsg = 'Add';
      } else {
        $scope.deadlineBtnMsg = '';
      };
      // if (($scope.task.newDeadlineDate != null) && ($scope.task.newDeadlineTime != null)) {
      //   console.log($scope.task.newDeadlineDate + " " + $scope.task.newDeadlineTime);
      //   $scope.task.deadline = new Date($scope.task.newDeadlineDate.toDateString() + " " + $scope.task.newDeadlineTime.toTimeString());
      // };
      $scope.task.deadline = new Date();
    };
  };

  // complete task
  $scope.toggleTaskComplete = function () {
    $scope.task.completed = !$scope.task.completed;
    console.log($scope.task.completed);
  };

  // add snapshot
  $scope.addSnapshot = function() {
  // console.log('sanity');
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Choose From Library' },
        { text: 'Capture New Media' }
      ],
      // destructiveText: 'Delete',
      titleText: 'Add snapshot',
      cancelText: 'Cancel',
      cancel: function() {
        hideSheet();
      },
      buttonClicked: function(index) {
        console.log('sanity');
        $scope.task.snapshots.push(
          { title: 'New Snapshot', desc: 'Look at this beautiful new snapshot!', snap: 'snap1.png' }
        );
        return true;
      }
    });
  };

  // share snapshots
  $scope.shareSnapshots = function() {
    if ($scope.task.snapshots.length === 0 || !$scope.task.snapshots) {
      var alertPopup = $ionicPopup.alert({
        title: 'No snapshots added!',
        template: 'Add some snapshots to share.'
        });
        alertPopup.then(function(res) {
          console.log('Shared snapshots!');
        }
      );
    } else {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Share snapshots?',
        template: 'Are you sure you want to share all your snapshots with your friends for feedback?'
        });
        confirmPopup.then(function(res) {
        if(res) {
          var alertPopup = $ionicPopup.alert({
            title: 'Snapshots shared!',
            template: 'Your snapshots of this task have been shared with your friends. Check the comments section later for feedback.'
            });
            alertPopup.then(function(res) {
              console.log('Shared snapshots!');
              $timeout(function () {
                console.log('adding comments');
                $scope.task.comments.push(
                  { author: 'Harrison Wray', comment: 'The Flow team is doing amazing work. Love them.' }
                );
              }, 1200);
              $timeout(function () {
                console.log('adding comments');
                $scope.task.comments.push(
                  { author: 'James Landay', comment: 'Wow, these comments keep appearing magically.' }
                );
              }, 3200);
            }
          );
          // console.log('You are sure');
        } else {
          console.log('Snapshots not shared');
        }
      });
    };

  };
})

Flow.controller('IdeaboardCtrl', function($scope, ideaboard, notelist, projects, $window, $ionicActionSheet, $location, $timeout) {
  $scope.ideaboard = ideaboard.ideas;
  console.log($scope.ideaboard);

  // idea actions 
  $scope.showIdeaActions = function(idea) {
    console.log(idea);
    var getProjectTitles = function () {
      titles = [];
      for (var i = 0; i < projects.projects.length; i++) {
        titles.push({ text: projects.projects[i].title });
      };
      return titles;
    }
    var pTitles = getProjectTitles();
    console.log('Project Titles: ', pTitles);
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: pTitles,
      destructiveText: 'Delete',
      titleText: 'Add idea to existing project',
      cancelText: 'Cancel',
      cancel: function() {
        hideSheet();
      },
      buttonClicked: function(index) {
        var project = projects.projects[index];
        console.log('Adding to project:', project.title);
        var note = { projectId: project.id, title: idea.title, desc: idea.desc };
        console.log(note);
        notelist.insert(note);
        $timeout(function () {
          $location.path('/app/projects/' + project.id);
        }, 200);
        return true;
      },
      destructiveButtonClicked: function(index) {
        console.log('deleting');
        // TO DO: delete from ideaboard
        $location.path('/app/404');
        return true;
      }
    });
  };
})

Flow.controller('404Ctrl', function($scope, $window) {

});
