angular.module('starter.services', [])

.factory('ideaboard', function ($q) {
	var STORAGE_ID = 'ideaboard-angularjs';

	var store = {
		ideas: [],

		_getFromLocalStorage: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		_saveToLocalStorage: function (ideas) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(ideas));
		},

		delete: function (idea) {
			var deferred = $q.defer();

			store.ideas.splice(store.ideas.indexOf(idea), 1);

			store._saveToLocalStorage(store.ideas);
			deferred.resolve(store.ideas);

			return deferred.promise;
		},

		get: function () {
			var deferred = $q.defer();

			angular.copy(store._getFromLocalStorage(), store.ideas);
			deferred.resolve(store.ideas);

			return deferred.promise;
		},

		insert: function (idea) {
			var deferred = $q.defer();

			store.ideas.push(idea);

			store._saveToLocalStorage(store.ideas);
			deferred.resolve(store.ideas);

			return deferred.promise;
		},

		put: function (idea, index) {
			var deferred = $q.defer();

			store.ideas[index] = idea;

			store._saveToLocalStorage(store.ideas);
			deferred.resolve(store.ideas);

			return deferred.promise;
		}
	};

	return store;
})

.factory('tasklist', function ($q) {
	var STORAGE_ID = 'tasklist-angularjs';

	var store = {
		tasks: [],

		_getFromLocalStorage: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		_saveToLocalStorage: function (tasks) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
		},

		delete: function (task) {
			var deferred = $q.defer();

			store.tasks.splice(store.tasks.indexOf(task), 1);

			store._saveToLocalStorage(store.tasks);
			deferred.resolve(store.tasks);

			return deferred.promise;
		},

		get: function () {
			var deferred = $q.defer();

			angular.copy(store._getFromLocalStorage(), store.tasks);
			deferred.resolve(store.tasks);

			return deferred.promise;
		},

		insert: function (task) {
			var deferred = $q.defer();

			task.id = store.tasks.length + 1;

			store.tasks.push(task);

			store._saveToLocalStorage(store.tasks);
			deferred.resolve(store.tasks);

			return deferred.promise;
		},

		put: function (task, index) {
			var deferred = $q.defer();

			store.tasks[index] = task;

			store._saveToLocalStorage(store.tasks);
			deferred.resolve(store.tasks);

			return deferred.promise;
		}
	};

	return store;
})

.factory('notelist', function ($q) {
	var STORAGE_ID = 'notelist-angularjs';

	var store = {
		notes: [],

		_getFromLocalStorage: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		_saveToLocalStorage: function (notes) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(notes));
		},

		delete: function (item) {
			var deferred = $q.defer();

			store.notes.splice(store.notes.indexOf(item), 1);

			store._saveToLocalStorage(store.notes);
			deferred.resolve(store.notes);

			return deferred.promise;
		},

		get: function () {
			var deferred = $q.defer();

			angular.copy(store._getFromLocalStorage(), store.notes);
			deferred.resolve(store.notes);

			return deferred.promise;
		},

		insert: function (item) {
			var deferred = $q.defer();

			item.id = store.notes.length + 1;

			store.notes.push(item);

			store._saveToLocalStorage(store.notes);
			deferred.resolve(store.notes);

			return deferred.promise;
		},

		put: function (item, index) {
			var deferred = $q.defer();

			store.notes[index] = item;

			store._saveToLocalStorage(store.notes);
			deferred.resolve(store.notes);

			return deferred.promise;
		}
	};

	return store;
})

.factory('projects', function ($q) {
	var STORAGE_ID = 'projects-angularjs';

	var store = {
		projects: [],

		_getFromLocalStorage: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		_saveToLocalStorage: function (projects) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(projects));
		},

		delete: function (project) {
			var deferred = $q.defer();

			store.projects.splice(store.projects.indexOf(project), 1);

			store._saveToLocalStorage(store.projects);
			deferred.resolve(store.projects);

			return deferred.promise;
		},

		get: function () {
			var deferred = $q.defer();

			angular.copy(store._getFromLocalStorage(), store.projects);
			deferred.resolve(store.projects);

			return deferred.promise;
		},

		insert: function (project) {
			var deferred = $q.defer();

			project.id = store.projects.length + 1;
			store.projects.push(project);

			store._saveToLocalStorage(store.projects);
			deferred.resolve(store.projects);

			return deferred.promise;
		},

		put: function (project, index) {
			var deferred = $q.defer();

			store.projects[index] = project;

			store._saveToLocalStorage(store.projects);
			deferred.resolve(store.projects);

			return deferred.promise;
		}
	};

	return store;
});