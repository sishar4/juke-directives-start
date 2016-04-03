'use strict';

juke.controller('SongChooseCtrl', function ($scope, SongFactory) {

  $scope.songs = [];

  SongFactory.fetchAll()
  .then(function (songs) {
    $scope.songs = songs;
  });

  $scope.reset = function () {
    $scope.toAdd = null;
  };

  $scope.addIt = function () {
    $scope.addSong($scope.toAdd)
    .then(function () {
      $scope.reset();
    });
  };

});

juke.directive('songList', ['PlayerFactory', function(PlayerFactory) {
  return {
    restrict: 'EA',
    scope: {
      songs: '='
    },
    link: function(scope, element, attr) {
      scope.toggle = function (song) {
        if (song !== PlayerFactory.getCurrentSong()) {
          PlayerFactory.start(song, scope.songs);
        } else if ( PlayerFactory.isPlaying() ) {
          PlayerFactory.pause();
        } else {
          PlayerFactory.resume();
        }
      };

      scope.getCurrentSong = function () {
        return PlayerFactory.getCurrentSong();
      };

      scope.isPlaying = function (song) {
        return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
      };
    },
    templateUrl: '/js/song/templates/song-list.html'
  };
}]);

juke.directive('doubleClick', ['PlayerFactory', function(PlayerFactory) {
  return {
    restrict: 'A',
    scope: {
      doubleClick: '&',
      song: '='
    },
    link: function(scope, element, attr) {
      scope.toggle = function (song) {
        if (song !== PlayerFactory.getCurrentSong()) {
          PlayerFactory.start(song, scope.songs);
        } else if ( PlayerFactory.isPlaying() ) {
          PlayerFactory.pause();
        } else {
          PlayerFactory.resume();
        }
      };

      element.on('dblclick', function () {
        scope.toggle(scope.song);
      });
    }
  };
}]);










