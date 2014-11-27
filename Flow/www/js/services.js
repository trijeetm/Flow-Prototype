angular.module('starter.services', [])

.factory('_ideaboard', [function () {
  var inspirations = [];
  inspirations.push(
    { title: "Haider - A short play", desc: "An international representation of Shakespeare's Macbeth" },
    { title: "Jazz Project", desc: "A synth based jazz composition on the C-minor pentatonic scale" }
  );
  return inspirations;
}])

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
});